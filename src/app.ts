import cors from "cors";
import express, { Application } from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from "./routes/routes";

const PORT: number = 3333;

export const app: Application = express();
const bodyParser = require('body-parser');

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
    try {
       mongoose.connect(process.env.MONGO_URI as string);
      console.log('Connected to Database');
    } catch (error) {
      console.log('Erro to connect Database!');
    }
  }