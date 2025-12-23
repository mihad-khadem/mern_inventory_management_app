import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  bulkDeleteCategories,
} from "../../services/inventory/category.service.js";

// Create
export const createCategoryController = catchAsync(async (req, res) => {
  const category = await createCategory(req.body);
  sendResponse(res, {
    status: httpStatus.CREATED,
    message: "Category created successfully",
    data: category,
  });
});

// Get all
export const getAllCategoriesController = catchAsync(async (req, res) => {
  const categories = await getAllCategories(req?.query);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Categories fetched successfully",
    data: categories,
  });
});

// Get single
export const getCategoryByIdController = catchAsync(async (req, res) => {
  const category = await getCategoryById(req.params.id);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Category fetched successfully",
    data: category,
  });
});

// Update
export const updateCategoryController = catchAsync(async (req, res) => {
  const category = await updateCategory(req.params.id, req.body);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Category updated successfully",
    data: category,
  });
});

// Delete
export const deleteCategoryController = catchAsync(async (req, res) => {
  const category = await deleteCategory(req.params.id);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Category deleted successfully",
    data: category,
  });
});

// Toggle active status
export const toggleCategoryStatusController = catchAsync(async (req, res) => {
  const category = await toggleCategoryStatus(req.params.id, req.body.isActive);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Category status updated successfully",
    data: category,
  });
});

// Bulk delete
export const bulkDeleteCategoriesController = catchAsync(async (req, res) => {
  const categories = await bulkDeleteCategories(req.body.ids);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Categories deleted successfully",
    data: categories,
  });
});
