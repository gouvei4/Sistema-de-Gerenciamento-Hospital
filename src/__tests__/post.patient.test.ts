import { Request, Response } from 'express';
import CreatePatientService from '../services/patientService/post.patient.service'; 
import HospitalModel from '../models/hospital.models';
import Patient from '../models/patient.models';
import { ValidationError } from 'yup';

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
});