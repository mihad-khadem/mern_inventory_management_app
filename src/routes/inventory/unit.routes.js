import express from "express";
import {
  createUnitController,
  getAllUnitsController,
  getUnitByIdController,
  updateUnitController,
  deleteUnitController,
  createConversionController,
  getAllConversionsController,
  getConversionByIdController,
  updateConversionController,
  deleteConversionController,
} from "../../controllers/inventory/unit.controller.js";

const router = express.Router();

// UNIT ROUTES
router.post("/", createUnitController);
router.get("/", getAllUnitsController);
router.get("/:id", getUnitByIdController);
router.patch("/:id", updateUnitController);
router.delete("/:id", deleteUnitController);

// UNIT CONVERSION ROUTES
router.post("/conversion", createConversionController);
router.get("/conversion", getAllConversionsController);
router.get("/conversion/:id", getConversionByIdController);
router.patch("/conversion/:id", updateConversionController);
router.delete("/conversion/:id", deleteConversionController);

export default router;
