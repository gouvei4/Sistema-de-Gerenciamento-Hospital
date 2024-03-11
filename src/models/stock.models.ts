import mongoose, { Schema } from 'mongoose';
import { Stock } from '../types/stock';

const stockSchema = new Schema<Stock>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  hospitalId: {type: String, required: true}
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
