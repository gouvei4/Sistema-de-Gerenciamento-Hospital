import { Request, Response } from "express";
import { Hospital } from "../types/hospital";
import hospitalSchema from "../models/hospital.models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class SignInHospitalService {
  public async signIn(request: Request, response: Response) {
    try {
      const { email, password } = request.body as Hospital;
      const isUserExist = await hospitalSchema.findOne({ email: email });

      if (!isUserExist) {
        response.status(404).json({
          type: "Error login",
          resource: "Email",
          message: "Invalid email",
        });
        return;
      }

      const isPasswordExist = await bcrypt.compare(
        password,
        isUserExist?.password
      );

      if (!isPasswordExist) {
        response.status(404).json({
          type: "Error password",
          message: "Email or password is incorrect",
        });
        return;
      }

      const token = jwt.sign(
        {
          _id: isUserExist?._id,
          email: isUserExist?.email,
        },
        "token-jwt",
        {
          expiresIn: "20Days",
        }
      );
      response.status(200).json({
        nameHospital: isUserExist.nameHospital,
        email: isUserExist.email,
        token: token,
      });
    } catch (err) {
      response.status(500).json({
        type: 'Server error',
        message: 'Wrong server',
      });
    }
  }
}

export default new SignInHospitalService();

