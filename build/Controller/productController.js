"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category_Sales = exports.TrendingProducts = exports.TotalSales = exports.getAllProducts = void 0;
const products_1 = __importDefault(require("../Models/products"));
const sales_1 = __importDefault(require("../Models/sales"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * 10;
        const results = yield sales_1.default.aggregate([
            {
                $group: {
                    _id: "$ProductID",
                    TotalQuantity: { $sum: "$Quantity" },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "ProductID",
                    as: "productInfo",
                },
            },
            {
                $unwind: "$productInfo",
            },
            {
                $skip: skip
            },
            {
                $limit: 10
            },
            {
                $project: {
                    _id: 0,
                    ProductID: "$_id",
                    ProductName: "$productInfo.ProductName",
                    Price: "$productInfo.Price",
                    TotalQuantity: 1,
                },
            },
        ]);
        res.json({
            results,
            status: 200,
            message: "fetching  products succesfully",
        });
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err.message, message: "error getting  project " });
    }
});
exports.getAllProducts = getAllProducts;
const TotalSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mind = new Date(req.query.mind);
    const maxd = new Date(req.query.maxd);
    sales_1.default.aggregate([
        {
            $match: {
                Date: { $gte: mind, $lte: maxd },
            },
        },
        {
            $group: {
                _id: null,
                TotalAmount: { $sum: "$TotalAmount" },
            },
        },
    ])
        .then((results) => {
        res.json({
            results,
            status: 200,
            message: "fetching total sales",
        });
    })
        .catch((error) => {
        res.status(500).json({
            error: error.message,
            status: 500,
            message: "internal server error",
        });
    });
});
exports.TotalSales = TotalSales;
const TrendingProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topSellingProducts = yield sales_1.default.aggregate([
            {
                $group: {
                    _id: "$ProductID",
                    TotalQuantity: { $sum: "$Quantity" },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "ProductID",
                    as: "productInfo",
                },
            },
            {
                $unwind: "$productInfo",
            },
            {
                $sort: { TotalQuantity: -1 },
            },
            {
                $limit: 5,
            },
            {
                $project: {
                    _id: 0,
                    ProductID: "$_id",
                    ProductName: "$productInfo.ProductName",
                    Price: "$productInfo.Price",
                    TotalQuantity: 1,
                },
            },
        ]);
        const results = topSellingProducts.map((product) => (Object.assign(Object.assign({}, product), { totalIncome: product.Price * product.TotalQuantity })));
        res.json({
            results,
            status: 200,
            message: "fetching top products succesfully",
        });
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err.message, message: "error getting trending project " });
    }
});
exports.TrendingProducts = TrendingProducts;
const Category_Sales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoriesWithSales = yield products_1.default.aggregate([
            {
                $lookup: {
                    from: "sales",
                    localField: "ProductID",
                    foreignField: "ProductID",
                    as: "salesInfo",
                },
            },
            {
                $addFields: {
                    salesCount: { $sum: "$salesInfo.Quantity" },
                },
            },
            {
                $group: {
                    _id: "$Category",
                    totalSalesCount: { $sum: "$salesCount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    Category: "$_id",
                    totalSalesCount: 1,
                },
            },
        ]);
        const totalSales = categoriesWithSales.reduce((prevS, currS) => prevS + currS.totalSalesCount, 0);
        const results = categoriesWithSales.map((item) => {
            return Object.assign(Object.assign({}, item), { categoryPercentage: ((item.totalSalesCount * 100) / totalSales).toFixed(2) });
        });
        res.status(200).json({
            results,
            status: 200,
            message: "category sales data ",
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            status: 500,
            message: "internal server error",
        });
    }
});
exports.Category_Sales = Category_Sales;
