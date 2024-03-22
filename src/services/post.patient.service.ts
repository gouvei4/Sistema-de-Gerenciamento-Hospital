import { Request, Response } from 'express';
import HospitalModel from '../models/hospital.models';
import Patient from '../models/patient.models';
import { format, isValid, parse } from 'date-fns';
import { createValidationSchemaPaciente } from '../validations/validations';
import { ValidationError } from 'yup';

class CreatePatientService {
  public async create(request: Request, response: Response) {
    try {
      typeof request.body.birthDate === 'string'
        ? (() => {
            const parsedDate = parse(
              request.body.birthDate,
              'dd/MM/yyyy',
              new Date()
            );
            return !isValid(parsedDate)
              ? response.status(400).json({ error: 'Invalid date format' })
              : ((request.body.birthDate = format(parsedDate, 'dd/MM/yyyy')),
                void 0);
          })()
        : void 0;

      try {
        await createValidationSchemaPaciente.validate(request.body, {
          stripUnknown: true,
        });
      } catch (error) {
        return error instanceof ValidationError
          ? response
              .status(404)
              .json({ error: 'Validation error', details: error.errors })
          : response.status(404).json({ error: 'Validation error' });
      }

      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        return response.status(401).json({
          success: false,
          message: 'Not Authenticated. Access token is missing!',
        });
      }

      const { name, cpf, birth, gender, dateEntry } = request.body;
      const hospitalId = request.params.hospitalId;

      const existingPatient = await Patient.findOne({ cpf: cpf });

      if (existingPatient) {
        return response.status(400).json({ message: 'Patient already exists' });
      }

      const hospital = await HospitalModel.findById(hospitalId);

      if (!hospital) {
        return response.status(404).json({ message: 'Hospital not found' });
      }

      if (hospital.availableBeds.valueOf() <= 0) {
        return response.status(400).json({ message: 'No available beds' });
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
        message: 'Patient registered successfully',
        name,
        cpf,
        birth,
        gender,
        dateEntry,
        patientId: patient._id,
        hospitalName: hospital.nameHospital,
      });
    } catch (error: any) {
      response.status(500).json({ message: 'Error when registering patient' });
    }
  }
}

export default new CreatePatientService();
