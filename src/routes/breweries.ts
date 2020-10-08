import express from 'express';

import { protect } from '../middleware/auth';

const router = express.Router();

import { getBreweries } from '../controllers/breweries';

router.get('/', protect, getBreweries);

export default router;
