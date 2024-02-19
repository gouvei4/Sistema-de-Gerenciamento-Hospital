import { Request, Response } from "express";
import HospitalModel from "../models/hospital.models";
import Patient from "../models/patient.models";
import { format, isValid, parse } from "date-fns";
import { createValidationSchemaPaciente } from "../validations/validations";
import { ValidationError } from "yup";

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

      try {
        await createValidationSchemaPaciente.validate(request.body, {
          stripUnknown: true,
        });
      } catch (error) {
        if (error instanceof ValidationError) {
          const details = error.errors;
          return response
            .status(404)
            .json({ error: "Validation error", details });
        } else {
          return response.status(404).json({ error: "Validation error" });
        }
      }

      const { name, cpf, birth, gender, dateEntry } = request.body;
      const hospitalId = request.params.hospitalId;
      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        response.status(401).json({
          success: false,
          message: "Not Authenticated. Acess token is missing!",
        });
      }

      const existingPatient = await Patient.findOne({ cpf: cpf });

      if (existingPatient) {
        return response.status(400).json({ message: "Patient already exists" });
      }

      const hospital = await HospitalModel.findById(hospitalId);

      if (!hospital) {
        return response.status(404).json({ message: "Hospital not found" });
      }

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

      response.status(201).json({
        message: "Patient registered successfully",
        name,
        cpf,
        birth,
        gender,
        dateEntry,
        patientId: patient._id,
        hospitalName: hospital.nameHospital,
      });
    } catch (error: any) {
      console.log(error);
      response.status(500).json({ message: "Error when registering patient" });
    }
  }
}

export default new CreatePatientService();
