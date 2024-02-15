import express from 'express';
import CreateHospitalController from '../controllers/create.hospital.controller';
import SignInHospitalController from '../controllers/signin.hospital.controller';
import GetAllHospitalsController from '../controllers/get.hospital.controller';
import GetParamsHospitalController from '../controllers/get.hospitalparams.controller';


const routes = express.Router();

routes.get('/', function(request, response) {
    response.json({ API: 'Welcome to JWT Authentication'});
});

routes.use('/api/v1/hospital', CreateHospitalController.router);
routes.use('/api/v1/hospital/signup', SignInHospitalController.router)
routes.use('/api/v1/hospitais', GetAllHospitalsController. router)
routes.use('/api/v1/hospital', GetParamsHospitalController. router)

export default routes;