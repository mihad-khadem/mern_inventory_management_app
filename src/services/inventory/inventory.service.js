// inventory core stock service
import mongoose from "mongoose";
import Stock from "../models/stock.model.js";
import Ledger from "../models/ledger.model.js";
import Product from "../models/product.model.js";
import Variant from "../models/variant.model.js";

class InventoryService {
  /**
   * Add stock to warehouse (purchase, adjustment, transfer in)
   */
  static async addStock({
    companyId,
    warehouseId,
    productId,
    variantId = null,
    batchId = null,
    quantity,
    unitCost = 0,
    reason = "adjustment",
    referenceType = null,
    referenceId = null,
    userId,
  }) {
    if (!quantity || quantity <= 0) throw new Error("Quantity must be > 0");

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Find or create stock record
      const stock = await Stock.findOneAndUpdate(
        { companyId, warehouseId, productId, batchId },
        { $inc: { quantity } },
        { upsert: true, new: true, setDefaultsOnInsert: true, session }
      );

      // Optional: update avgCostPrice
      if (unitCost) {
        const prevQty = stock.quantity - quantity;
        stock.avgCostPrice =
          (stock.avgCostPrice * prevQty + unitCost * quantity) / stock.quantity;
        await stock.save({ session });
      }

      // 2. Record ledger entry
      await Ledger.create(
        [
          {
            companyId,
            productId,
            warehouseId,
            batchId,
            transactionType: "purchase",
            referenceType,
            referenceId,
            quantity,
            unitCost,
            totalCost: unitCost * quantity,
            beforeQty: stock.quantity - quantity,
            afterQty: stock.quantity,
            remarks: reason,
            createdBy: userId,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return stock;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  /**
   * Reduce stock from warehouse (sale, adjustment, transfer out)
   */
  static async reduceStock({
    companyId,
    warehouseId,
    productId,
    variantId = null,
    batchId = null,
    quantity,
    reason = "sale",
    referenceType = null,
    referenceId = null,
    userId,
  }) {
    if (!quantity || quantity <= 0) throw new Error("Quantity must be > 0");

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const stock = await Stock.findOne({
        companyId,
        warehouseId,
        productId,
        batchId,
      }).session(session);

      if (!stock || stock.quantity < quantity)
        throw new Error("Insufficient stock");

      const beforeQty = stock.quantity;
      stock.quantity -= quantity;
      await stock.save({ session });

      // Ledger entry
      await Ledger.create(
        [
          {
            companyId,
            productId,
            warehouseId,
            batchId,
            transactionType: "sale",
            referenceType,
            referenceId,
            quantity,
            unitCost: stock.avgCostPrice,
            totalCost: stock.avgCostPrice * quantity,
            beforeQty,
            afterQty: stock.quantity,
            remarks: reason,
            createdBy: userId,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return stock;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  /**
   * Transfer stock between warehouses
   */
  static async transferStock({
    companyId,
    productId,
    variantId = null,
    batchId = null,
    fromWarehouseId,
    toWarehouseId,
    quantity,
    userId,
  }) {
    if (fromWarehouseId === toWarehouseId)
      throw new Error("Cannot transfer to same warehouse");

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Reduce stock from source
      await this.reduceStock({
        companyId,
        warehouseId: fromWarehouseId,
        productId,
        variantId,
        batchId,
        quantity,
        reason: "transfer_out",
        referenceType: "WarehouseTransfer",
        referenceId: `${fromWarehouseId}->${toWarehouseId}`,
        userId,
      });

      // Add stock to destination
      await this.addStock({
        companyId,
        warehouseId: toWarehouseId,
        productId,
        variantId,
        batchId,
        quantity,
        reason: "transfer_in",
        referenceType: "WarehouseTransfer",
        referenceId: `${fromWarehouseId}->${toWarehouseId}`,
        userId,
      });

      await session.commitTransaction();
      session.endSession();
      return { message: "Transfer successful" };
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  /**
   * Adjust stock (manual correction)
   */
  static async adjustStock({
    companyId,
    warehouseId,
    productId,
    variantId = null,
    batchId = null,
    quantity,
    reason,
    userId,
  }) {
    if (quantity === 0) throw new Error("Adjustment cannot be 0");

    if (quantity > 0)
      return this.addStock({
        companyId,
        warehouseId,
        productId,
        variantId,
        batchId,
        quantity,
        reason,
        referenceType: "Adjustment",
        referenceId: null,
        userId,
      });
    else
      return this.reduceStock({
        companyId,
        warehouseId,
        productId,
        variantId,
        batchId,
        quantity: Math.abs(quantity),
        reason,
        referenceType: "Adjustment",
        referenceId: null,
        userId,
      });
  }
}

export default InventoryService;
