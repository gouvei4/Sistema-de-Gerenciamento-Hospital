import { Router } from 'express';
import DeleteStockService from '../services/delete.stocks.service';

class DeleteStockController {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.delete('/:id', DeleteStockService.deleteStockService);
    }
}

export default new DeleteStockController();