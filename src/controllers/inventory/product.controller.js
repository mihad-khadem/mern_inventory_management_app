import * as productService from "../../services/inventory/product.service.js";

import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";

// Create product
export const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body, req.user._id);
  sendResponse(res, {
    success: true,
    data: product,
    message: "Product created successfully",
  });
});

// Get all products ( supports advanced query -> search, filter, sort, fields, pagination)
export const getProducts = catchAsync(async (req, res) => {
  const products = await productService.getProducts(req.query);
  sendResponse(res, {
    success: true,
    data: products,
    message: "Products fetched successfully",
  });
});

// Get single product
export const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  sendResponse(res, {
    success: true,
    data: product,
    message: "Product fetched successfully",
  });
});

// Update product
export const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    data: product,
    message: "Product updated successfully",
  });
});

// Delete product
export const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  sendResponse(res, { success: true, message: "Product deleted successfully" });
});
