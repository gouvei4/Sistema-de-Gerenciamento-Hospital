import { Request, Response } from 'express';
import Hospital, { IHospital } from '../../models/hospital.models';

class GetAllHospitalsService {
  public async getAll(request: Request, response: Response) {
    try {
      const hospitals: IHospital[] = await Hospital.find();

      const filteredHospitals = hospitals.map((hospital) => ({
        _id: hospital._id,
        nameHospital: hospital.nameHospital,
        address: hospital.address,
        beds: hospital.beds,
        availableBeds: hospital.availableBeds,
      }));

      return filteredHospitals.length === 0 ? (
        response.status(404).json({
          error: 'Hospitals not found',
          message: 'Not Found',
        }),
        void 0
      ) : (
        response.status(200).json({
          status: 201,
          message: 'Successful operation. Returns a list of hospitals.',
          filteredHospitals,
        }),
        void 0
      );
      
    } catch (error: any) {
      return response.status(500).json({
        error: 'Internal Server Error',
        message: error.message,
      });
    }
  }
}

export default new GetAllHospitalsService();
