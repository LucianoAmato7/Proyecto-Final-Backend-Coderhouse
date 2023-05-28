import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const orderSchema = new mongoose.Schema(
  {
    timestamp: String,
    user: Object,
    products: Array,
    total: Number
  },
  {
    versionKey: false,
  }
);

export const order_Model = mongoose.model("orders", orderSchema);
