import { Request, Response } from 'express';
import Patient from '../../models/patient.models';

class DeletePatient {
  public async deletePatient(request: Request, response: Response) {
    try {
      const patientId = request.params.id;

      const authorizationHeader = request.headers.authorization;

      !authorizationHeader
        ? response.status(401).json({
            sucess: false,
            message: 'Not Authenticated. Acess token is missing!',
          })
        : void 0;

      const patient = await Patient.findByIdAndDelete(patientId);
      response.status(patient ? 200 : 404).json({
        message: patient
          ? 'Patient was successfully deleted'
          : 'Patient was not found',
        patient: patient ? patient : undefined,
      });
    } catch (error: any) {
      console.error(error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new DeletePatient();
