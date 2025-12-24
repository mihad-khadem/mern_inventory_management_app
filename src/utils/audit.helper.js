import auditService from "../services/audit/audit.service.js";

export const logAudit = async ({
  req,
  user,
  action,
  module,
  resourceType,
  resourceId,
  description,
  before,
  after,
  userOverride, // for system actions failed logins / login attempts
  companyOverride, // for login /registration
}) => {
  try {
    // Determine user and company context

    // if neither user nor company -> drop the log

    const payload = {
      companyId: companyOverride || user?.companyId || null,
      userId: user?._id || null,
      action,
      module,
      resourceType,
      resourceId,
      description,
      before: before || null,
      after: after || null,
      ipAddress: req?.ip,
      userAgent: req?.headers?.["user-agent"],
    };

    // fire & forget (but awaited to avoid unhandled promise)
    await auditService.createLogEntry(payload);
  } catch (err) {
    // NEVER break business logic
    console.error("Audit helper error:", err.message);
  }
};
