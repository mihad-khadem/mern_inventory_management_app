import catchAsync from "../../utils/catchAsync.js";
import auditService from "../../services/audit/audit.service.js";
import sendResponse from "../../utils/sendResponse.js";

/**
 * GET /api/v1/audit-logs
 * Query params:
 * - page, limit
 * - sortBy (e.g., createdAt:desc)
 * - module, action, userId
 * - startDate, endDate
 * - search (search by user name/email or description)
 */
export const getAuditLogs = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    sortBy = "createdAt:desc",
    module,
    action,
    userId,
    startDate,
    endDate,
    search,
  } = req.query;

  const filter = {};

  // Role & company-based scoping
  if (req.user.role !== "super-admin") {
    filter.companyId = req.user.companyId;
  }

  if (module) filter.module = module;
  if (action) filter.action = action;
  if (userId) filter.userId = userId;

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }

  // Search in description or user name/email
  if (search) {
    filter.$or = [
      { description: { $regex: search, $options: "i" } },
      { "userId.name": { $regex: search, $options: "i" } },
      { "userId.email": { $regex: search, $options: "i" } },
    ];
  }

  // Pagination
  const pageNumber = parseInt(page, 10);
  const pageLimit = parseInt(limit, 10);
  const skip = (pageNumber - 1) * pageLimit;

  // Sorting
  const [sortField, sortOrder] = sortBy.split(":");
  const sortObj = { [sortField]: sortOrder === "desc" ? -1 : 1 };

  // Fetch logs
  const { logs, total } = await auditService.queryAuditLogs(filter, {
    skip,
    limit: pageLimit,
    sort: sortObj,
  });

  // Send response using custom helper
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Audit logs retrieved successfully",
    meta: {
      page: pageNumber,
      limit: pageLimit,
      total,
      pageCount: Math.ceil(total / pageLimit),
    },
    data: logs,
  });
});
