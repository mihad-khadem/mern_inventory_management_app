import catchAsync from "../utils/catchAsync.js";
import BrandService from "../services/brand.service.js";
import sendResponse from "../utils/sendResponse.js";
import httpStatus from "http-status";

export const createBrandController = catchAsync(async (req, res) => {
  const { name, description } = req.body;
  const companyId = req.user.companyId;
  const brand = await BrandService.createBrand({
    companyId,
    name,
    description,
  });

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: "Brand created successfully",
    data: brand,
  });
});

export const listBrandsController = catchAsync(async (req, res) => {
  const companyId = req.user.companyId;
  const brands = await BrandService.listBrands(companyId);

  sendResponse(res, {
    status: httpStatus.OK,
    message: "Brand list fetched",
    data: brands,
  });
});

export const updateBrandController = catchAsync(async (req, res) => {
  const brand = await BrandService.updateBrand(req.params.id, req.body);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Brand updated",
    data: brand,
  });
});

export const deleteBrandController = catchAsync(async (req, res) => {
  const brand = await BrandService.deleteBrand(req.params.id);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Brand deleted",
    data: brand,
  });
});
