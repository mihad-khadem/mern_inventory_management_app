import httpStatus, { status } from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import auditService from "../../services/audit/audit.service.js";

export const getAuditLogs = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt:desc",
    userId,
    action,
    startDate,
    endDate,
    module,
  } = req.query;

  const filter = {};

  // Company scoping
  if (req.user.role !== "super-admin") {
    filter.companyId = req.user.companyId;
  }

  if (userId) filter.userId = userId;
  if (action) filter.action = action;
  if (module) filter.module = module;

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }

  // Pagination
  const pageNumber = parseInt(page, 10);
  const pageLimit = parseInt(limit, 10);
  const skip = (pageNumber - 1) * pageLimit;

  // Sorting
  const [sortField, sortOrder] = sortBy.split(":");
  const sortObj = { [sortField]: sortOrder === "desc" ? -1 : 1 };

  const logs = await auditService.getLogs(filter, {
    skip,
    limit: pageLimit,
    sort: sortObj,
  });

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    success: true,
    message: "Audit logs retrieved successfully",
    meta: { page: pageNumber, limit: pageLimit, total: logs.length },
    data: logs,
  });
});
