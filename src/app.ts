import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import swagger from '../swagger.json';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import routes from './routes/routes';
import bodyParser from 'body-parser';
import notFoundRoute from './validations/routes';

const PORT: number = 3333;

export const app: Application = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(routes);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));
app.use(notFoundRoute);

process.env.NODE_ENV !== 'test'
  ? app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    }) && mongoose.connect(process.env.MONGO_URI as string)
      .then(() => console.log('Connected to Database'))
      .catch(error => console.log('Erro to connect Database!'))
  : null;
