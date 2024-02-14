import mongoose, { Schema } from "mongoose";
import { Stock } from "../types/stock";

const stockSchema = new Schema<Stock>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
});

export default mongoose.model("Stock", stockSchema);
