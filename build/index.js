"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const productController_1 = require("./Controller/productController");
const app = (0, express_1.default)();
const port = 3000;
const products_1 = __importDefault(require("./routes/products"));
const connection_1 = __importDefault(require("./database/connection"));
(0, connection_1.default)();
app.use((0, cors_1.default)());
app.use("/api/analytics", products_1.default);
app.get("/api/products", productController_1.getAllProducts);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
