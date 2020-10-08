import express from 'express';
import CustomError from '../utils/customError';

export const errorHandler = (err: any, _: express.Request, res: express.Response, _2: express.NextFunction): void => {
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Server Error',
  };
  // Various common Mongoose Errors
  if (err.name === 'CastError') {
    error = new CustomError('User not found', 404);
  }
  if (err.code === 11000) {
    error = new CustomError('Data collision', 400);
  }
  if (err.name === 'ValidationError') {
    error = new CustomError('Invalid inputs', 400);
  }
  // Axios error
  if (err.isAxiosError) {
    error = new CustomError('Connection with the BreweryAPI failed', 500);
  }

  // Logging when it's internal
  if (!error.statusCode.toString().startsWith('4')) console.log(err);

  res.status(error.statusCode).json({
    success: false,
    error: error.message,
  });
};

export const pageNotFound = (_: express.Request, res: express.Response, _2: express.NextFunction): void => {
  res.status(404).json({ success: false, error: 'Page not found!' });
};
