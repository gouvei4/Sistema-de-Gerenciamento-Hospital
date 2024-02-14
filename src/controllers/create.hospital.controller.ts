import { Router } from "express";
import CreateHospitalService from "../services/create.hospital.service";

class CreateHospitalController {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('', CreateHospitalService.signUp)
    }
}

export default new CreateHospitalController();