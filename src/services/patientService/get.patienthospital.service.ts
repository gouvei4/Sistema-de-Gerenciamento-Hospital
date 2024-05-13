import { Request, Response } from 'express';
import Patient from '../../models/patient.models';

class GetPatientService {
  public async getPatient(request: Request, response: Response) {
    try {
      const hospitalId = request.params.hospitalId;

      if (!hospitalId) {
        return response.status(400).json({
          error: 'Parameter (hospitalId) is missing in the request query.',
        });
      }

      const patients = await Patient.find({ hospitalId });

      if (patients.length === 0) {
        return response.status(404).json({
          error: 'No patients found for the specified hospital ID.',
        });
      }

      return response.status(200).json({
        message: 'Successful operation. Returns the list of patients.',
        patients,
      });
    } catch (error: any) {
      return response.status(500).json({
        error: 'Internal server error.',
      });
    }
  }
}

export default new GetPatientService();
