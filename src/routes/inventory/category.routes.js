import express from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
  toggleCategoryStatusController,
  bulkDeleteCategoriesController,
} from "../../controllers/inventory/category.controller.js";

const router = express.Router();

router.post("/", createCategoryController);
router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryByIdController);
router.patch("/:id", updateCategoryController);
router.delete("/:id", deleteCategoryController);
router.patch("/status/:id", toggleCategoryStatusController);
router.delete("/bulk-delete", bulkDeleteCategoriesController);

export default router;
