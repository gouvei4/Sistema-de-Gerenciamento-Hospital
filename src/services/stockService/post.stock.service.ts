import { Request, Response } from 'express';
import HospitalModel from '../../models/hospital.models';
import Stock from '../../models/stock.models';
import { createValidationSchemaStock } from '../../validations/validations';
import { ValidationError } from 'yup';

class CreateStockService {
  public async createStock(request: Request, response: Response) {
    try {
      await createValidationSchemaStock.validate(request.body, {
        stripUnknown: true,
      });
    } catch (error) {
      return error instanceof ValidationError
        ? response
            .status(404)
            .json({ error: 'Validation error', details: error.errors })
        : response.status(404).json({ error: 'Validation error' });
    }

    try {
      const { name, description, amount } = request.body;
      const hospitalId = request.params.hospitalId;
      const authorizationHeader = request.headers.authorization;

      !authorizationHeader
        ? response
            .status(401)
            .json({
              success: false,
              message: 'Not Authenticated. Access token is missing!',
            })
        : void 0;

      const hospital = await HospitalModel.findById(hospitalId);

      if (!hospital) {
        return response.status(404).json({ message: 'Hospital not found' });
      }

      const stocks = await Stock.create({
        name,
        description,
        amount,
        hospitalId,
      });
      response.status(201).json({
        success: true,
        message: 'Hospital stock',
        stocks: stocks,
        hospitalName: hospital.nameHospital,
      });
    } catch (error: any) {
      response.status(500).json({ message: 'Error when registering stock' });
    }
  }
}

export default new CreateStockService();
