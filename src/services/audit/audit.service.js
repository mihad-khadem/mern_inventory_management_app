import AuditLogModel from "../../models/audit/auditLog.model.js";

// audit service for logging user activities
class AuditService {
  async createLogEntry(payload) {
    try {
      return await AuditLogModel.create(payload);
    } catch (err) {
      // DO NOT BREAK BUSINESS FLOW
      console.error("Audit log failed:", err.message);
      return null;
    }
  }

  async getLogs(filter = {}, options = {}) {
    try {
      return await AuditLogModel.find(filter, null, options).sort({
        createdAt: -1,
      });
    } catch (err) {
      throw new ApiError(500, "Failed to retrieve audit logs");
    }
  }

  async getLogsByCompany(companyId, filter = {}, options = {}) {
    try {
      return await AuditLogModel.find({ companyId, ...filter }, null, options)
        .populate("userId", "name email role")
        .sort({ createdAt: -1 });
    } catch (err) {
      throw new ApiError(500, "Failed to retrieve company audit logs");
    }
  }
  async queryAuditLogs(filter = {}, options = {}) {
    const { skip = 0, limit = 10, sort = { createdAt: -1 } } = options;
    return AuditLogModel.find(filter)
      .populate("userId", "name email role")
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }
}

export default new AuditService();
