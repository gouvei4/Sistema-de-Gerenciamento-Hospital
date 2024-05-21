import { Request, Response } from 'express';
import CreatePatientService from '../services/patientService/post.patient.service'; 
import Patient from '../models/patient.models';
import { testServer } from './jest.setup';

jest.mock('../models/hospital.models', () => ({
  findById: jest.fn(),
}));

jest.mock('../models/patient.models', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('CreatePatientService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if birth date is in invalid format', async () => {
    const request = { body: { birthDate: '2022-01-01' } } as Request;
    const response = mockResponse();

    await CreatePatientService.create(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ error: 'Invalid date format' });
  });

  it('Should successfully create a new patient', async () => {
    const patient: {
      name: string;
      birthDate: string;
      gender: string;
      cpf: string;
      hospitalId: string;
    } = {
      name: 'Gouveia',
      birthDate: '01/01/2000',
      gender: 'M',
      cpf: '494.333.333-99',
      hospitalId: '60a2e3896b4a3c0021fc365c',
    };

    expect(patient.name).toBe('Gouveia');
    expect(patient.birthDate).toBe('01/01/2000');
    expect(patient.gender).toBe('M');
    expect(patient.cpf).toBe('494.333.333-99');
    expect(patient.hospitalId).toBe('60a2e3896b4a3c0021fc365c');
  });

  it('Should return validation error', async () => {
    const patient = await testServer
    .post('/api/v1/hospital/:hospitalId/patients')
    .send({
      name: 'Go',
      birthDate: '01/01/2000',
      gender: 'M',
      cpf: '494.333.333-99',
      hospitalId: '60a2e3896b4a3c0021fc365c',
    });
    expect(patient.statusCode).toEqual(404);
    expect(patient.body.error).toBe('Validation error');
  });
});