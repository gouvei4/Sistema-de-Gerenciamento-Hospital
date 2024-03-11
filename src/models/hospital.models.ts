import mongoose, { Schema, Document } from 'mongoose';

export interface IHospital extends Document {
  nameHospital: string;
  address: string;
  beds: number;
  availableBeds: number;
  email: string;
  password: string;
  confirmPassword: string;
  patients: string[];
}

const hospitalSchema: Schema<IHospital> = new Schema<IHospital>({
  nameHospital: { type: String, required: true },
  address: { type: String, required: true },
  beds: { type: Number, required: true },
  availableBeds: { type: Number, required: true, default: 0 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

export default mongoose.model<IHospital>('Hospital', hospitalSchema);
