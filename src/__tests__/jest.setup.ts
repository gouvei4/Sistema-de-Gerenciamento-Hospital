import supertest from 'supertest';

import { app } from '../app';


export const testServer = supertest(app);