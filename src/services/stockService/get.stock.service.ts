import { Request, Response } from 'express';
import Stock from '../../models/stock.models';

class GetStocksService {
  public async getStocks(request: Request, response: Response) {
    try {
      const hospitalId = request.query.hospitalId;

      !hospitalId ? 
        response.status(400).json({
          error: 'Parameter (hospitalId) is missing in the request query.',
        }) : void 0;

      const stocks = await Stock.find({ hospitalId });

      stocks.length === 0 ? 
        response.status(404).json({
          error: 'No Stocks found for the specifed hospital ID.',
        }) : void 0;

      return response.status(200).json({
        message: 'Stocks Found',
        stocks,
      });
    } catch (error: any) {
      return response.status(500).json({
        error: 'Internal server error.',
      });
    }
  }
}

export default new GetStocksService();
