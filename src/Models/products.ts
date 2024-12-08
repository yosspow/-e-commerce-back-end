import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    ProductID: { type: String, required: true },
    ProductName: { type: String, required: true },
    Category: { type: String, required: true },
    Price: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
    toJSON: {
      transform: function (doc: any, ret: any) {
        ret.id = ret._id; // Transform _id to id
        delete ret._id; // Remove _id field
        delete ret.__v; // Optionally remove the __v field
      },
    },
  },
);
productSchema.index({ Category: 1 });
productSchema.index({ ProductID: 1 });
const Product = mongoose.model("product", productSchema);

export default Product;
