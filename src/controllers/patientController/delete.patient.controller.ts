import { Router } from 'express';
import DeletePatient from '../../services/patientService/delete.patient.service';

class DeletePatientController {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.delete('/:id', DeletePatient.deletePatient);
    }
}

export default new DeletePatientController();