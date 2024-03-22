import { Request, Response } from 'express';
import CreateHospitalService from '../services/post.hospital.service';

describe('CreateHospitalService', () => {
  it('Should return error 404 if the date of birth has an invalid format', () => {
    interface RequestBody {
      birthDate: string;
    }

    const mockRequest = {
      body: {
        birthDate: '31/02/2022',
      },
      get: jest.fn(),
      header: jest.fn(),
      accepts: jest.fn(),
      acceptsCharsets: jest.fn(),
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    } as unknown as Response;

    CreateHospitalService.signUp(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Invalid date format',
    });
  });

  it('Should successfully create a new hospital', async () => {
    const hospital: {
      nameHospital: string;
      address: string;
      beds: number;
      availableBeds: number;
      email: string;
      password: string;
      confirmPassword: string;
    } = {
      nameHospital: 'Hospital Teste',
      address: 'Rua teste, 147',
      beds: 50,
      availableBeds: 80,
      email: 'hospitalteste@gmail.com',
      password: 'teste123@',
      confirmPassword: 'teste123@'
    };

    expect(hospital.nameHospital).toBe('Hospital Teste');
    expect(hospital.address).toBe('Rua teste, 147');
    expect(hospital.beds).toBe(50);
    expect(hospital.availableBeds).toBe(80);
    expect(hospital.email).toBe('hospitalteste@gmail.com');
    expect(hospital.password).toBe('teste123@');
    expect(hospital.confirmPassword).toBe('teste123@');

  });  
});
