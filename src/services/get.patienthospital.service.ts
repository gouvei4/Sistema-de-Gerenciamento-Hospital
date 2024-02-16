import { Request, Response } from "express";
import IPatient from "../models/patient.models";

class GetPatientService {
  public async getPatient(request: Request, response: Response) {
    try {
      const hospital = request.query.hospitals;
      const authorizationHeader = request.headers.authorization;
      console.log(`Buscando pacientes do hospital: ${hospital}`);

      if (!authorizationHeader) {
        response.status(401).json({
          success: false,
          message: "Not Authenticated. Access token is missing",
        });
        return;
      }
      if (!hospital) {
        console.log('Nome do hospital não foi fornecido.');
        return response.status(400).json({
          error: "Nome do hospital não foi fornecido na solicitação.",
        });
      }

      const patientsInHospital = await IPatient.find({ hospital: hospital });

      if (patientsInHospital.length > 0) {
        console.log(`Pacientes encontrados para o hospital ${hospital}:`, patientsInHospital);
        return response.json(patientsInHospital);
      } else {
        console.log(`Nenhum paciente encontrado para o hospital ${hospital}.`);
        return response.status(404).json({
          error: "Nenhum paciente encontrado para o hospital especificado.",
        });
      }
    } catch (error: any) {
      console.error('Erro ao buscar pacientes:', error.message);
      return response.status(500).json({
        error: "Erro ao buscar pacientes. Verifique o console para mais detalhes.",
      });
    }
  }
}

export default new GetPatientService();
