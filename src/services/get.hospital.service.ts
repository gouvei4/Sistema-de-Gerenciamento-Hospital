import { Request, Response } from "express";
import Hospital, { IHospital } from "../models/hospital.models";

class GetAllHospitalsService {
  public async getAll(request: Request, response: Response) {
    try {
      const hospitals: IHospital[] = await Hospital.find();

      const filteredHospitals = hospitals.map((hospital) => ({
        _id: hospital._id,
        nameHospital: hospital.nameHospital,
        address: hospital.address,
        beds: hospital.beds,
        availableBeds: hospital.availableBeds,
      }));

      if (filteredHospitals.length === 0) {
        return response.status(404).json({
          error: "Hospitals not found",
          message: "Not Found",
        });
      }

      return response.status(200).json({
        status: 201,
        message: "Hospitais",
        filteredHospitals,
      });
    } catch (error: any) {
      return response.status(500).json({
        error: "Internal Server Error",
        message: error.message,
      });
    }
  }
}

export default new GetAllHospitalsService();
