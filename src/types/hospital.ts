import  Patient  from '../models/patient.models';
import { Stock } from './stock';

export type Hospital = {
    nameHospital: string,
    address: string,
    beds: number,
    availableBeds: number,
    email: string;
    password: string;
    confirmPassword: string;
    patients: Patient[];
    stocks: Stock[];
}