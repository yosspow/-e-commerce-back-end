"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("../Controller/productController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/total_sales", productController_1.TotalSales);
router.get("/trending_products", productController_1.TrendingProducts);
router.get("/category_sales", productController_1.Category_Sales);
exports.default = router;
