import { Request, Response } from 'express';
import GetAllHospitalsService from '../services/hospitalService/get.hospital.service';
import { Model } from 'mongoose';
import Hospital, { IHospital } from '../models/hospital.models';

const mockFind = jest.fn();

(Hospital as unknown as Model<IHospital>).find = mockFind;

describe('GetAllHospitalsService', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {} as Partial<Request>;
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of hospitals if found', async () => {
    const hospitals = [
      {
        _id: '1',
        nameHospital: 'Hospital A',
        address: '123 Main St',
        beds: 100,
        availableBeds: 50,
      },
      {
        _id: '2',
        nameHospital: 'Hospital B',
        address: '456 Elm St',
        beds: 150,
        availableBeds: 75,
      },
    ];

    mockFind.mockResolvedValue(hospitals);

    await GetAllHospitalsService.getAll(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 201,
      message: 'Successful operation. Returns a list of hospitals.',
      filteredHospitals: hospitals.map((hospital) => ({
        _id: hospital._id,
        nameHospital: hospital.nameHospital,
        address: hospital.address,
        beds: hospital.beds,
        availableBeds: hospital.availableBeds,
      })),
    });
  });

  it('should return a 500 error if an error occurs', async () => {
    const errorMessage = 'Internal Server Error';
    mockFind.mockImplementation(() => Promise.reject(new Error(errorMessage)));

    await GetAllHospitalsService.getAll(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: errorMessage,
      message: errorMessage,
    });
  });
});
