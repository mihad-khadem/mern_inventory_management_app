const express = require("express");
const router = express.Router();
// Test route
router.get("/test", (req, res) => {
  res.json({ message: "API test route is working!" });
});

// Routes
const moduleRoutes = [
  //   {
  //       path: "/",
  //       route: ,
  //   },
  // {
  //     path: "/products",
  //     route: require("./product.routes"),
  // },
  // {
  //     path: "/categories",
  //     route: require("./category.routes"),
  // },
  // {
  //     path: "/purchases",
  //     route: require("./purchase.routes"),
  // },
  // {
  //     path: "/sales",
  //     route: require("./sale.routes"),
  // },
];
// const authRoutes = require("./auth.routes");
// const productRoutes = require("./product.routes");
// add other routes similarly
// const categoryRoutes = require("./category.routes");
// const purchaseRoutes = require("./purchase.routes");
// const saleRoutes = require("./sale.routes");
// router.use("/auth", authRoutes);
// router.use("/products", productRoutes);
// router.use("/categories", categoryRoutes);
// router.use("/purchases", purchaseRoutes);
// router.use("/sales", saleRoutes);
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
