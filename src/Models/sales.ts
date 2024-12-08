import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    SaleID: { type: String, required: true },
    ProductID: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Date: { type: Date, required: true },
    TotalAmount: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);
saleSchema.index({ ProductID: 1 });

const Sale = mongoose.model("sale", saleSchema);

export default Sale;
