import express from 'express';

const catcher = (fn: (...args: any) => any) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default catcher;
