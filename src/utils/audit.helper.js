import auditService from "../services/audit/audit.service.js";

export const logAudit = async ({
  req,
  action,
  module,
  resourceType,
  resourceId,
  description,
  before,
  after,
}) => {
  try {
    if (!req?.user || !req.user.companyId) return;

    const payload = {
      companyId: req.user.companyId,
      userId: req.user._id,

      action,
      module,

      resourceType,
      resourceId,
      description,

      before,
      after,

      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    };

    // fire & forget (but awaited to avoid unhandled promise)
    await auditService.createLogEntry(payload);
  } catch (err) {
    // NEVER break business logic
    console.error("Audit helper error:", err.message);
  }
};
