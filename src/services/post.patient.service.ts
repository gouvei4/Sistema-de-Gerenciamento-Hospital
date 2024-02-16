import { Request, Response } from "express";
import HospitalModel from "../models/hospital.models";
import Patient from "../models/patient.models";
import { format, isValid, parse } from "date-fns";

class CreatePatientService {
  public async create(request: Request, response: Response) {
    try {
      if (typeof request.body.birthDate === "string") {
        const parsedDate = parse(
          request.body.birthDate,
          "dd/MM/yyyy",
          new Date()
        );

        if (!isValid(parsedDate)) {
          return response.status(400).json({ error: "Invalid date format" });
        }

        request.body.birthDate = format(parsedDate, "dd/MM/yyyy");
      }

      const { name, cpf, birth, gender, dateEntry } = request.body;
      const hospitalId = request.params.hospitalId;

      const hospital = await HospitalModel.findById(hospitalId);

      if (!hospital) {
        return response.status(404).json({ message: "Hospital not found" });
      }

      console.log(hospital.availableBeds)
      if (hospital.availableBeds.valueOf() <= 0) {
        return response.status(400).json({ message: "No available beds" });
      }
      hospital.availableBeds = Number(hospital.availableBeds) - 1;
      hospital.beds = Number(hospital.beds) + 1;
      
      await hospital.save();

      const patient = await Patient.create({
        name,
        cpf,
        birth,
        gender,
        dateEntry,
        hospitalId,
      });

      response
        .status(201)
        .json({ message: "Patient registered successfully", patient });
    } catch (error: any) {
      console.error("Error registering patient:", error);
      response.status(500).json({ message: "Error when registering patient" });
    }
  }
}

export default new CreatePatientService();
