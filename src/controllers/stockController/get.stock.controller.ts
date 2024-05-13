import { Router } from 'express';
import GetStocksService from '../../services/stockService/get.stock.service';

class GetStockController {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('', GetStocksService.getStocks);
    }
}

export default new GetStockController();


