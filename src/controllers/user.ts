import express from 'express';

import { createUser, authenticate } from '../services/user';
import CustomError from '../utils/customError';
import catcher from '../utils/catcher';

export const register = catcher(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !(typeof req.body.username === 'string') ||
    !(typeof req.body.password === 'string')
  )
    return next(new CustomError('Please provide the required inputs', 400));
  const { username, password }: { username: string; password: string } = req.body;
  const user = await createUser({ username, password });
  res.status(201).json({ success: true, token: user.token });
});

export const login = catcher(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !(typeof req.body.username === 'string') ||
    !(typeof req.body.password === 'string')
  )
    return next(new CustomError('Please provide the required inputs', 400));
  const { username, password }: { username: string; password: string } = req.body;
  const response = await authenticate({ username, password });
  if (!response.exists) return next(new CustomError("User doesn't exist", 404));
  if (!response.authenticated) return next(new CustomError('Invalid credentials!', 401));
  res.status(200).json({ success: true, token: response.token });
});
