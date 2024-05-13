import { Router } from 'express';
import CreateStockService from '../../services/stockService/post.stock.service';

class CreateStockController {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/:hospitalId/stock', CreateStockService.createStock);
    }
}

export default new CreateStockController();