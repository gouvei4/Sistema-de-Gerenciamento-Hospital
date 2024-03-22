import { Request, Response } from 'express';
import GetParamsHospitals from '../services/get.hospitalparams.service'; 
import Hospital, { IHospital } from '../models/hospital.models';

jest.mock('../models/hospital.models', () => ({
    find: jest.fn(),
  }));
  
  describe('GetParamsHospitals', () => {
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
  
    it('Should return a 404 error if no hospitals are found with the provided name', async () => {
        mockRequest.query = { nameHospital: 'Unknown Hospital' };
    
        (Hospital.find as jest.Mock).mockResolvedValue([]);
    
        await GetParamsHospitals.getParams(mockRequest as Request, mockResponse as Response);
    
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
          error: 'Not Found',
          message: 'Hospital not found. Please check the name and try again later.',
        });
      });

      it('Should return a list of hospitals if hospitals are found with the provided name', async () => {
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
    
        mockRequest.query = { nameHospital: 'Hospital A' };
    
        (Hospital.find as jest.Mock).mockResolvedValue(hospitals);
    
        await GetParamsHospitals.getParams(mockRequest as Request, mockResponse as Response);
    
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ hospitals });
      });
});
