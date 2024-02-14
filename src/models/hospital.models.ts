import mongoose, { Schema, Document } from "mongoose";
import { Hospital } from "../types/hospital";

export interface IHospital extends Document {
  nameHospital: string,
  address: string,
  beds: string,
  availableBeds: string,
  email: string;
  password: string;
  confirmPassword: string;
}

const hospitalSchema: Schema = new Schema<Hospital>({
  nameHospital: { type: String, required: true },
  address: { type: String, required: true },
  beds: { type: String, required: true },
  availableBeds: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

export default mongoose.model<IHospital>("Hospital", hospitalSchema);
