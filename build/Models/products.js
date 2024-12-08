"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    ProductID: { type: String, required: true },
    ProductName: { type: String, required: true },
    Category: { type: String, required: true },
    Price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id; // Transform _id to id
            delete ret._id; // Remove _id field
            delete ret.__v; // Optionally remove the __v field
        },
    },
});
productSchema.index({ Category: 1 });
productSchema.index({ ProductID: 1 });
const Product = mongoose_1.default.model("product", productSchema);
exports.default = Product;
