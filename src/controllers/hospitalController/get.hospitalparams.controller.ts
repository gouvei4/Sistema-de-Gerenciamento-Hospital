import { Router } from 'express';
import GetParamsHospitals from '../../services/hospitalService/get.hospitalparams.service';

class GetParamsHospitalController {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('', GetParamsHospitals.getParams);
    }
}

export default new GetParamsHospitalController();