import mongoose, { Schema } from "mongoose";
import { Paciente } from "../types/paciente";

const pacienteSchema = new Schema<Paciente>({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  nascimento: { type: Date, required: true },
  date: { type: Date, required: true, unique: true },
  sexo: { type: String, required: true },
  dataEntrada: { type: Date, required: true },
});

export default mongoose.model("Paciente", pacienteSchema);
