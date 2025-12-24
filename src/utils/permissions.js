import ApiError from "../error/apiError.js";
import httpStatus from "http-status";
// Define permission constants
export const PERMISSIONS = {
  // auth
  AUTH: {
    LOGIN: "auth:login",
    LOGOUT: "auth:logout",
    FAILED_LOGIN: "auth:failed-login",

    USER_VIEW: "auth:user:view",
    USER_CREATE: "auth:user:create",
    USER_UPDATE: "auth:user:update",
    USER_DELETE: "auth:user:delete",

    PASSWORD_CHANGE: "auth:user:password-change",
    ROLE_CHANGE: "auth:user:role-change",
    PERMISSION_CHANGE: "auth:user:permission-change",

    USER_LOCK: "auth:user:lock",
    USER_UNLOCK: "auth:user:unlock",
  },

  // company
  COMPANY: {
    VIEW: "company:view",
    CREATE: "company:create",
    UPDATE: "company:update",
    DELETE: "company:delete",

    SUBSCRIPTION_VIEW: "company:subscription:view",
    SUBSCRIPTION_UPDATE: "company:subscription:update",
  },

  //  inventory
  INVENTORY: {
    PRODUCT_VIEW: "inventory:product:view",
    PRODUCT_CREATE: "inventory:product:create",
    PRODUCT_UPDATE: "inventory:product:update",
    PRODUCT_DELETE: "inventory:product:delete",

    CATEGORY_MANAGE: "inventory:category:manage",
    BRAND_MANAGE: "inventory:brand:manage",
    UNIT_MANAGE: "inventory:unit:manage",
    WARRANTY_MANAGE: "inventory:warranty:manage",
    VARIANT_MANAGE: "inventory:variant:manage",
  },
  // stock
  STOCK: {
    VIEW: "stock:view",
    IN: "stock:in",
    OUT: "stock:out",
    TRANSFER: "stock:transfer",
    ADJUST: "stock:adjust",
    RESERVE: "stock:reserve",
    RELEASE: "stock:release",

    INVENTORY_AUDIT: "stock:inventory-audit",
  },
  // warehouse
  WAREHOUSE: {
    VIEW: "warehouse:view",
    CREATE: "warehouse:create",
    UPDATE: "warehouse:update",
    DELETE: "warehouse:delete",
  },

  // supplier
  SUPPLIER: {
    VIEW: "supplier:view",
    CREATE: "supplier:create",
    UPDATE: "supplier:update",
    DELETE: "supplier:delete",
  },
  // purchase
  PURCHASE: {
    CREATE: "purchase:create",
    UPDATE: "purchase:update",
    CANCEL: "purchase:cancel",
    RECEIVE: "purchase:receive",
  },
  // pos
  POS: {
    SALE_CREATE: "pos:sale:create",
    SALE_CANCEL: "pos:sale:cancel",
    SALE_REFUND: "pos:sale:refund",
    DISCOUNT_APPLY: "pos:discount:apply",
  },
  //   e-commerce

  ECOMMERCE: {
    ORDER_VIEW: "ecommerce:order:view",
    ORDER_PROCESS: "ecommerce:order:process",
    ORDER_CANCEL: "ecommerce:order:cancel",
    SHIPMENT_CREATE: "ecommerce:shipment:create",
    RETURN_PROCESS: "ecommerce:return:process",
  },

  FINANCE: {
    INVOICE_VIEW: "finance:invoice:view",
    INVOICE_CREATE: "finance:invoice:create",
    INVOICE_APPROVE: "finance:invoice:approve",

    PAYMENT_PROCESS: "finance:payment:process",
    REFUND_ISSUE: "finance:refund:issue",
  },

  /* ---------------- HRM ---------------- */
  HRM: {
    EMPLOYEE_VIEW: "hrm:employee:view",
    EMPLOYEE_CREATE: "hrm:employee:create",
    EMPLOYEE_UPDATE: "hrm:employee:update",
    EMPLOYEE_TERMINATE: "hrm:employee:terminate",
  },

  // cms
  CMS: {
    PAGE_VIEW: "cms:page:view",
    PAGE_CREATE: "cms:page:create",
    PAGE_UPDATE: "cms:page:update",
    PAGE_PUBLISH: "cms:page:publish",
  },
  // audit

  AUDIT: {
    VIEW: "audit:view",
    EXPORT: "audit:export",
  },
  // system traces
  SYSTEM: {
    CONFIG_UPDATE: "system:config:update",
    DATA_MIGRATION: "system:data:migration",
    MAINTENANCE: "system:maintenance",
  },
};
