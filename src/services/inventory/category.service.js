import Category from "../../models/inventory/category.model.js";
import ApiError from "../../error/apiError.js";
import httpStatus from "http-status";
import QueryBuilder from "../../utils/QueryBuilder.js";
// Create
export const createCategory = async (payload) => {
  const existing = await Category.findOne({ name: payload.name });
  if (existing)
    throw new ApiError(httpStatus.CONFLICT, "Category already exists");

  const category = await Category.create(payload);
  return category;
};

// Get all
export const getAllCategories = async (query) => {
  const qb = new QueryBuilder(
    Category.find().populate("parentCategory", "name slug"),
    query
  )
    .search(["name", "slug", "description"])
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const categories = await qb.exec();
  return categories;
};

// Get single
export const getCategoryById = async (id) => {
  const category = await Category.findById(id).populate(
    "parentCategory",
    "name slug"
  );
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  return category;
};

// Update
export const updateCategory = async (id, payload) => {
  const category = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  return category;
};

// Delete
export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  return category;
};
// Bulk delete
export const bulkDeleteCategories = async (ids) => {
  const result = await Category.deleteMany({ _id: { $in: ids } });
  return result;
};
// Toggle active status
export const toggleCategoryStatus = async (id, isActive) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { isActive },
    { new: true }
  );
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  return category;
};
