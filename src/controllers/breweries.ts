import express from 'express';
import catcher from '../utils/catcher';
import { getBreweryList } from '../services/breweries';

export const getBreweries = catcher(async (req: express.Request, res: express.Response, _: express.NextFunction) => {
  const query = req.query.query as string;
  const breweries = await getBreweryList(query);
  res.status(200).json({
    success: true,
    data: breweries,
  });
});
