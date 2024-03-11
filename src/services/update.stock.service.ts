import { Request, Response } from 'express';
import { updateValidationSchemaStock } from '../validations/validations';
import { ValidationError } from 'yup';
import Stock from '../models/stock.models';

class UpdateStockService {
  public async UpdateStock(request: Request, response: Response) {
    try {
      try {
        await updateValidationSchemaStock.validate(request.body, {
          stripUnknown: true,
        });
      } catch (error) {
        return error instanceof ValidationError
          ? response.status(400).json({ erro: 'Erro de validação', detalhes: error.errors })
          : response.status(400).json({ erro: 'Erro de validação' });
      }

      const idStock = request.params.stockId;
      const authorizationHeader = request.headers.authorization;

      !authorizationHeader
        ? response.status(401).json({
            success: false,
            message: 'Not Authenticated. Acess token is missing!',
          })
        : void 0;

      const StockHospital = await Stock.findById(idStock);

      !StockHospital
        ? response.status(404).json({ erro: 'Estoque hospitalar não encontrado' })
        : void 0;

      const fieldsAllowed = ['name', 'description', 'amount'];
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
        mensagem: 'Estoque atualizado com sucesso',
        stockUpdate,
      });
    } catch (error) {
      return response.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
}

export default new UpdateStockService();
