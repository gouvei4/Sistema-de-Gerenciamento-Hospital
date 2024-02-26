import { Request, Response } from "express";
import { updateValidationSchemaStock } from "../validations/validations";
import { ValidationError } from "yup";
import Stock from "../models/stock.models";

class UpdateStockService {
  public async UpdateStock(request: Request, response: Response) {
    try {
      try {
        await updateValidationSchemaStock.validate(request.body, {
          stripUnknown: true,
        });
      } catch (error) {
        if (error instanceof ValidationError) {
          const detalhes = error.errors;
          return response
            .status(400)
            .json({ erro: "Erro de validação", detalhes });
        } else {
          return response.status(400).json({ erro: "Erro de validação" });
        }
      }

      const idStock = request.params.stockId;
      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        response.status(401).json({
          success: false,
          message: "Not Authenticated. Acess token is missing!",
        });
      }
      const StockHospital = await Stock.findById(idStock);

      if (!StockHospital) {
        return response
          .status(404)
          .json({ erro: "Estoque hospitalar não encontrado" });
      }

      const fieldsAllowed = ["name", "description", "amount"];
      const stockUpdate: Record<string, any> = {};

      Object.keys(request.body).forEach((campo: string) => {
        if (fieldsAllowed.includes(campo)) {
          stockUpdate[campo] = request.body[campo];
        }
      });

      await Stock.findByIdAndUpdate(idStock, stockUpdate, {
        new: true,
      });

      return response.status(200).json({
        status: 201,
        success: true,
        mensagem: "Estoque atualizado com sucesso",
        stockUpdate,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ erro: "Erro interno do servidor" });
    }
  }
}

export default new UpdateStockService();
