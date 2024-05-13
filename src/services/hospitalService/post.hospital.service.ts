import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Hospital } from '../../types/hospital';
import hospitalSchema from '../../models/hospital.models';
import { format, isValid, parse } from 'date-fns';
import { createValidationSchemaHospital } from '../../validations/validations';
import { ValidationError } from 'yup';

class CreateHospitalService {
  public async signUp(request: Request, response: Response) {
    try {
      typeof request.body.birthDate === 'string'
        ? (() => {
            const parsedDate = parse(
              request.body.birthDate,
              'dd/MM/yyyy',
              new Date()
            );
            return !isValid(parsedDate)
              ? response.status(404).json({ error: 'Invalid date format' })
              : ((request.body.birthDate = format(parsedDate, 'dd/MM/yyyy')),
                void 0);
          })()
        : void 0;

      try {
        await createValidationSchemaHospital.validate(request.body, {
          stripUnknown: true,
        });
      } catch (error) {
        return error instanceof ValidationError
          ? response
              .status(404)
              .json({ error: 'Validation error', details: error.errors })
          : response.status(404).json({ error: 'Validation error' });
      }

      const existingUser = await hospitalSchema.findOne({
        email: request.body.email,
      });

      if (existingUser) {
        return response.status(400).json({ error: 'Email already exists' });
      }

      const payload = request.body as Hospital;
      const hashedPassword = await bcrypt.hash(payload.password, 10);

      const newUser = await hospitalSchema.create({
        ...payload,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });
      response.status(201).json({
        status: 201,
        success: true,
        message: 'Hospital created Successfully',
        user: newUser,
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        type: 'Server Error',
        message: 'Wrong Error',
      });
    }
  }
}

export default new CreateHospitalService();
