import express from "express";
import {
  createBrandController,
  listBrandsController,
  updateBrandController,
  deleteBrandController,
} from "../controllers/brand.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate); // all routes protected
router.post("/", authorize(["admin"]), createBrandController);
router.get("/", listBrandsController);
router.patch("/:id", authorize(["admin"]), updateBrandController);
router.delete("/:id", authorize(["admin"]), deleteBrandController);

export default router;
