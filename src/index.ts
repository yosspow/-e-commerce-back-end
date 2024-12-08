import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { getAllProducts } from "./Controller/productController";
const app = express();
const port = 3000;
import productRoutes from "./routes/products";
import ConnectDb from "./database/connection";
import Sale from "./Models/sales";
import Product from "./Models/products";

ConnectDb();
app.use(cors());
app.use("/api/analytics", productRoutes);
app.get("/api/products", getAllProducts);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
