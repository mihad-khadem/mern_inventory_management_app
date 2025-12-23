import AuditLogModel from "../../models/audit/auditLog.model.js";
import ApiError from "../../error/apiError.js";

class AuditService {
  /**
   * Create a new audit log entry
   * Never break business flow if logging fails
   */
  async createLogEntry(payload) {
    try {
      return await AuditLogModel.create(payload);
    } catch (err) {
      console.error("Audit log failed:", err.message);
      return null; // do not throw
    }
  }

  /**
   * Query audit logs with filters, pagination, sorting, and population
   */
  async queryAuditLogs(filter = {}, options = {}) {
    const { skip = 0, limit = 10, sort = { createdAt: -1 } } = options;

    try {
      const [logs, total] = await Promise.all([
        AuditLogModel.find(filter)
          .populate("userId", "name email role")
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
        AuditLogModel.countDocuments(filter),
      ]);

      return { logs, total };
    } catch (err) {
      throw new ApiError(500, "Failed to query audit logs");
    }
  }

  /**
   * Get logs for a specific company
   */
  async getLogsByCompany(companyId, filter = {}, options = {}) {
    try {
      const companyFilter = { companyId, ...filter };
      const logs = await AuditLogModel.find(companyFilter, null, options)
        .populate("userId", "name email role")
        .sort({ createdAt: -1 })
        .lean();
      return logs;
    } catch (err) {
      throw new ApiError(500, "Failed to retrieve company audit logs");
    }
  }
}

export default new AuditService();
