import  Patient  from "../models/patient.models";
import { Stock } from "./stock";

export type Hospital = {
    nameHospital: string,
    address: string,
    beds: Number,
    availableBeds: Number,
    email: string;
    password: string;
    confirmPassword: string;
    patients: Patient[];
    stocks: Stock[];
}