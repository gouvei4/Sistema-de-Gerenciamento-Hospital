import { Router } from 'express';
import GetPatientService from '../../services/patientService/get.patienthospital.service';

class GetPatientController {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/:hospitalId/patients', GetPatientService.getPatient);
    }
}

export default new GetPatientController();
