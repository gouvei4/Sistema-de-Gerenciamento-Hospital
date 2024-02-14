import mongoose, { Schema } from "mongoose";
import { Hospital } from "../types/hospital";

const hospitalSchema = new Schema<Hospital>({
  nameHospital: { type: String, required: true },
  address: { type: String, required: true },
  leitos: { type: String, required: true },
  leitosDisponiveis: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

export default mongoose.model("Hospital", hospitalSchema);
