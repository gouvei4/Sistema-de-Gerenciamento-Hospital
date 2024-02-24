import { Router } from "express";
import UpdateStockService from "../services/update.stock.service";

class UpdateStockController {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.put('/:hospitalId/:stockId', UpdateStockService.UpdateStock)
    }
}

export default new UpdateStockController();