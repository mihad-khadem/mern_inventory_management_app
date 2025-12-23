import express from "express";
import authRoute from "./auth.routes.js";
import userRoute from "./user.routes.js";
import auditRoute from "./audit/audit.routes.js";

const router = express.Router();
// Global routes handlers
const moduleRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/audit",
    route: auditRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
