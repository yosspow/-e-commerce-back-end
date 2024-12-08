"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const saleSchema = new mongoose_1.default.Schema({
    SaleID: { type: String, required: true },
    ProductID: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Date: { type: Date, required: true },
    TotalAmount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
saleSchema.index({ ProductID: 1 });
const Sale = mongoose_1.default.model("sale", saleSchema);
exports.default = Sale;
