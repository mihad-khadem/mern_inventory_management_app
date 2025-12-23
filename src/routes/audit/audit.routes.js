import express from "express";
import { getAuditLogs } from "../../controllers/audit/audit.controller.js";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
const router = express.Router();

// GET /api/v1/audit-logs
// Access: super-admin, admin
router.get(
  "/audit-logs",
  authenticate,
  //   authorize(["super-admin", "admin"]),
  getAuditLogs
);

export default router;
