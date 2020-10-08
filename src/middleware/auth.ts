import express from 'express';
import jwt from 'jsonwebtoken';

import catcher from '../utils/catcher';
import CustomError from '../utils/customError';
import User from '../models/User';

/**
 * Middleware for establishing protected routes, authenticating the user via the provided token.
 */
export const protect = catcher(async (req: express.Request, _: express.Response, next: express.NextFunction) => {
  if (!req.headers.authorization) return next(new CustomError('Authorization token not provided', 401));
  if (!req.headers.authorization.startsWith('Bearer '))
    return next(new CustomError('Token is malformatted, please provide Bearer-Token', 401));
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const userDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await User.findById(userDecoded.id);
    if (!user) return next(new CustomError('No user matches the request', 401));
    next();
  } catch (error) {
    return next(new CustomError('Not authorized to acces route', 401));
  }
});
