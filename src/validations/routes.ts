import { Request, Response, NextFunction } from 'express';

const notFoundRoute = (request: Request, response: Response, next: NextFunction) => {
  const error = new Error('Route not found');
  response.status(404).json({
    error: {
      message: error.message
    }
  });
};

export default notFoundRoute;