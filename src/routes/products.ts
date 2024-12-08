import {
  Category_Sales,
  TotalSales,
  TrendingProducts,
} from "../Controller/productController";

import { Router } from "express";

const router = Router();

router.get("/total_sales", TotalSales);

router.get("/trending_products", TrendingProducts);

router.get("/category_sales", Category_Sales);

export default router;
