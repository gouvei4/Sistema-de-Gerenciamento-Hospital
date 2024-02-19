import { Router } from "express";
import CreatePatientService from '../services/post.patient.service';

class CreatePatientController {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/:hospitalId/patients', CreatePatientService.create);
    }
}

export default new CreatePatientController();
