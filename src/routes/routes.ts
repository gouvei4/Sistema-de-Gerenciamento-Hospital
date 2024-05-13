import express from 'express';
import CreateHospitalController from '../controllers/create.hospital.controller';
import SignInHospitalController from '../controllers/signin.hospital.controller';
import GetAllHospitalsController from '../controllers/get.hospital.controller';
import GetParamsHospitalController from '../controllers/get.hospitalparams.controller';
import CreatePatientController from '../controllers/create.patient.controller';
import GetPatientController from '../controllers/get.patienthospital.controller';
import CreateStockController from '../controllers/stockController/create.stock.controller';
import GetStockController from '../controllers/stockController/get.stock.controller';
import UpdateStockController from '../controllers/stockController/update.stock.controller';
import DeletePatientController from '../controllers/delete.patient.controller';
import DeleteStockController from '../controllers/stockController/delete.stocks.controller';

const routes = express.Router();

routes.get('/', function (request, response) {
  response.json({ API: 'Welcome to JWT Authentication' });
});

routes.use('/api/v1/signup', CreateHospitalController.router);
routes.use('/api/v1/signin', SignInHospitalController.router);
routes.use('/api/v1/hospitais', GetAllHospitalsController.router);
routes.use('/api/v1/hospital', GetParamsHospitalController.router);
routes.use('/api/v1/hospital', CreatePatientController.router);
routes.use('/api/v1/hospitals', GetPatientController.router);
routes.use('/api/v1/hospital', CreateStockController.router);
routes.use('/api/v1/hospital/stocks', GetStockController.router);
routes.use('/api/v1/hospital', UpdateStockController.router);
routes.use('/api/v1/hospital', DeletePatientController.router);
routes.use('/api/v1/hospital/stock', DeleteStockController.router);

export default routes;
