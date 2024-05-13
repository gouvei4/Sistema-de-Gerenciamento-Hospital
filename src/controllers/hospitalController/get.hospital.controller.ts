import { Router } from 'express';
import GetAllHospitalsService from '../services/get.hospital.service';

class GetAllHospitalsController {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('', GetAllHospitalsService.getAll);
    }
}

export default new GetAllHospitalsController();
