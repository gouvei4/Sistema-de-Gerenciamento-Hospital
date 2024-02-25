import { Request, Response } from "express";
import Stock from "../models/stock.models";

class DeleteStockService {
  public async deleteStockService(request: Request, response: Response) {
    try {
      const stockId = request.params.id;

      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        response.status(401).json({
          success: false,
          error: "Not authorized",
          message: "Not authorized Access token is missing",
        });
        return;
      }

      const stocks = await Stock.findByIdAndDelete(stockId);

      if (stocks) {
        response.status(200).json({
            message: 'Stock was successfully deleted',
            stocks
        });
      } else {
        response.status(404).json({ message: 'Stock was not found' });
      }
    } catch (error: any) {
      console.log(error);
        response.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new DeleteStockService();
