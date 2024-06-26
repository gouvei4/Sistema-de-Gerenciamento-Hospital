import { Router } from 'express';
import SignInHospitalService from '../../services/hospitalService/signin.hospital.service';

class SignInHospitalController {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('', SignInHospitalService.signIn);
    }
}

export default new SignInHospitalController();