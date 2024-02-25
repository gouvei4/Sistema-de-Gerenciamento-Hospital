import { Request, Response } from 'express';
import Patient from '../models/patient.models';

class DeletePatient {
    public async deletePatient(request: Request, response: Response) {
        try {
            const patientId = request.params.id;

            const authorizationHeader = request.headers.authorization;

            if (!authorizationHeader) {
              response.status(401).json({
                success: false,
                error: 'Not authorized',
                message: 'Not authorized Access token is missing',
              });
              return;
            }

            const patient = await Patient.findByIdAndDelete(patientId);

            if (patient) { 
                response.status(200).json({ 
                    message: 'Patient was successfully deleted',
                    patient
                });
            } else {
                response.status(404).json({ message: 'Patient was not found' });
            }
        } catch (error: any) {
            response.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default new DeletePatient();