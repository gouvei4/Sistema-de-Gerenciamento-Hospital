import express from 'express';
import CreateHospitalController from '../controllers/create.hospital.controller';
import SignInHospitalController from '../controllers/signin.hospital.controller';
import GetAllHospitalsController from '../controllers/get.hospital.controller';
import GetParamsHospitalController from '../controllers/get.hospitalparams.controller';
import CreatePatientController from '../controllers/create.patient.controller';
import GetPatientController from '../controllers/get.patienthospital.controller';
import CreateStockController from '../controllers/create.stock.controller';
import GetStockController from '../controllers/get.stock.controller';
import UpdateStockController from '../controllers/update.stock.controller';

const routes = express.Router();

routes.get('/', function(request, response) {
    response.json({ API: 'Welcome to JWT Authentication'});
});

routes.use('/api/v1/signup', CreateHospitalController.router);
routes.use('/api/v1/signin', SignInHospitalController.router)
routes.use('/api/v1/hospitais', GetAllHospitalsController. router)
routes.use('/api/v1/hospital', GetParamsHospitalController. router)
routes.use('/api/v1/hospital', CreatePatientController. router)
routes.use('/api/v1/hospitals', GetPatientController. router)
routes.use('/api/v1/hospital', CreateStockController. router)
routes.use('/api/v1/hospital/stocks', GetStockController.router)
routes.use('/api/v1/hospital', UpdateStockController.router)





export default routes;