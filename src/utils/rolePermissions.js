import { PERMISSIONS } from "./permissions.js";
// Define role-based permissions
// upgrade: later can be moved to data-driven approach
export const ROLE_PERMISSIONS = {
  // owner
  "super-admin": Object.values(PERMISSIONS).flatMap((group) =>
    Object.values(group)
  ),
  // ceo, admin
  admin: [
    ...Object.values(PERMISSIONS.AUTH),
    ...Object.values(PERMISSIONS.COMPANY),
    ...Object.values(PERMISSIONS.INVENTORY),
    ...Object.values(PERMISSIONS.STOCK),
    ...Object.values(PERMISSIONS.WAREHOUSE),
    ...Object.values(PERMISSIONS.SUPPLIER),
    ...Object.values(PERMISSIONS.PURCHASE),
    ...Object.values(PERMISSIONS.POS),
    ...Object.values(PERMISSIONS.CUSTOMER),
    ...Object.values(PERMISSIONS.SALE),
    ...Object.values(PERMISSIONS.REPORT),
    ...Object.values(PERMISSIONS.FINANCE),
    PERMISSIONS.AUDIT.VIEW,
  ],

  manager: [
    PERMISSIONS.AUTH.USER_VIEW,

    PERMISSIONS.INVENTORY.PRODUCT_VIEW,
    PERMISSIONS.INVENTORY.PRODUCT_UPDATE,

    PERMISSIONS.STOCK.VIEW,
    PERMISSIONS.STOCK.IN,
    PERMISSIONS.STOCK.OUT,
    PERMISSIONS.STOCK.TRANSFER,

    PERMISSIONS.POS.SALE_CREATE,
    PERMISSIONS.POS.SALE_CANCEL,
  ],

  staff: [
    PERMISSIONS.STOCK.VIEW,
    PERMISSIONS.STOCK.IN,
    PERMISSIONS.POS.SALE_CREATE,
    PERMISSIONS.POS.SALE_CANCEL,
  ],
  user: [PERMISSIONS.AUTH.USER_VIEW, PERMISSIONS.INVENTORY.PRODUCT_VIEW],
};
