import httpStatus from "http-status";
import BrandModel from "../../models/inventory/Brand";
import ApiError from "../../utils/ApiError";
import e from "express";
class BrandService {
  static async createBrand(brandData) {
    const existing = await BrandModel.findOne({
      companyId,
      name,
    });
    if (existing) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Brand with this name already exists in the company"
      );
    }
    const brand = await BrandModel.create(brandData);
    return brand;
  }
  //   list brands
  static async listBrands(companyId) {
    const brands = await BrandModel.find({ companyId, status: "active" });
    return brands;
  }
  //   get brand by id
  static async getBrandById(brandId) {
    const brand = await BrandModel.findById(brandId);
    if (!brand) {
      throw new ApiError(httpStatus.NOT_FOUND, "Brand not found");
    }
    return brand;
  }
  //   update brand
  static async updateBrand(brandId, payload) {
    const brand = await BrandModel.findByIdAndUpdate(brandId, payload, {
      new: true,
    });
    if (!brand) {
      throw new ApiError(httpStatus.NOT_FOUND, "Brand not found");
    }
    return brand;
  }
  //   delete brand
  static async deleteBrand(brandId) {
    const brand = await BrandModel.findByIdAndUpdate(
      brandId,
      { status: "inactive" },
      { new: true }
    );
    if (!brand) {
      throw new ApiError(httpStatus.NOT_FOUND, "Brand not found");
    }
    return brand;
  }
}
export default BrandService;
