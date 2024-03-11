import mongoose, { Schema } from 'mongoose';
import { Patient } from '../types/patient';

const patientSchema = new Schema<Patient>({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  birth: { type: Date, required: true },
  gender: { type: String, required: true },
  dateEntry: { type: Date, required: true },
  hospitalId: { type: String, required: true },
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;