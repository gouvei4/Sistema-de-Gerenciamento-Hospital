import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import hospitalSchema from '../models/hospital.models';
import request from 'supertest';
import {app} from '../app';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('SignInHospitalService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should authenticate a user and return a token', async () => {
    const hospitalData = {
      email: 'hospitalteste@gmail.com',
      password: 'teste@123',
    };

    const mockHospital = {
      _id: 'mockUserId',
      nameHospital: 'Hospital Mock',
      email: hospitalData.email,
      password: 'hashedPassword',
    };

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    (jwt.sign as jest.Mock).mockReturnValue('mockToken');

    jest.spyOn(hospitalSchema, 'findOne').mockResolvedValue(mockHospital);

    const response = await request(app)
    .post('/api/v1/signin')
    .send(hospitalData)
    .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.nameHospital).toBe(mockHospital.nameHospital);
    expect(response.body.email).toBe(mockHospital.email);
    expect(response.body.token).toBe('mockToken');

    expect(bcrypt.compare).toHaveBeenCalledWith(hospitalData.password, mockHospital.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      { _id: mockHospital._id, email: mockHospital.email },
      'token-jwt',
      { expiresIn: '20days' }
    );
  });

  });
