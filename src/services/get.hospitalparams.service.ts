import { Request, Response } from 'express';
import Hospital, { IHospital } from '../models/hospital.models';

class GetParamsHospitals {
  public async getParams(request: Request, response: Response) {
    try {
      const searchHospital = request.query.nameHospital;

      return !searchHospital ? (
        response.status(400).json({
          error: 'Bad Request',
          message: 'Please provide a (nameHospital) parameter.',
        }),
        void 0
      ) : (
        (() => {
          const searchName = (searchHospital as string).toLowerCase();

          return Hospital.find(
            { nameHospital: { $regex: new RegExp(searchName, 'i') } },
            { nameHospital: 1, beds: 1, availableBeds: 1, address: 1 }
          ).then((hospitals: IHospital[]) => {
            return hospitals.length === 0 ? (
              response.status(404).json({
                error: 'Not Found',
                message:
                  'Hospital not found. Please check the name and try again later.',
              }),
              void 0
            ) : (
              response.status(200).json({ hospitals }),
              void 0
            );
          });
        })()
      );
    } catch (error: any) {
      console.error('Error while fetching hospitals:', error);
      return response.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
}

export default new GetParamsHospitals();
