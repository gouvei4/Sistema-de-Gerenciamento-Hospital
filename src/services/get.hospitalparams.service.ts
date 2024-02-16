import { Request, Response } from "express";
import Hospital, { IHospital } from "../models/hospital.models";

class GetParamsHospitals {
  public async getParams(request: Request, response: Response) {
    try {
      const searchHospital = request.query.nameHospital;

      if (!searchHospital) {
        return response.status(400).json({
          error: "Bad Request",
          message: "Please provide a 'nameHospital' parameter.",
        });
      }

      const searchName = (searchHospital as string).toLowerCase();

      const hospitals = await Hospital.find(
        { nameHospital: { $regex: new RegExp(searchName, "i") } },
        { nameHospital: 1, beds: 1, availableBeds: 1, address: 1, }
      );

      if (hospitals.length === 0) {
        return response.status(404).json({
          error: "Not Found",
          message:
            "Hospital not found. Please check the name and try again later.",
        });
      }

      return response.status(200).json({ hospitals });
    } catch (error: any) {
      console.error("Error while fetching hospitals:", error);
      response.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}

export default new GetParamsHospitals();
