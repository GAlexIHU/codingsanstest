import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rateLimiter from 'express-rate-limit';

// Setting the environment, production is the default
import loadenv from './utils/loadenv';
const envType = loadenv();

// DB
import connection from './utils/db';

// Routes
import breweriesRoute from './routes/breweries';
import authRoute from './routes/auth';

import { errorHandler, pageNotFound } from './middleware/errorHandler';

/**
 * Creates the server (separated for testing purposes)
 */
export const createApp = async (): Promise<express.Application> => {
  await connection.open();
  const app: express.Application = express();
  // Parser(s)
  app.use(express.json());
  // Enabling CORS
  app.use(cors());
  // Rate limiting in case someone was to really get into breweries...
  const limiter = rateLimiter({
    windowMs: 3 * 60 * 1000,
    max: 150,
  });
  app.use(limiter);
  // Logging
  // I wasn't sure how verbose the logging should be, nor where it should be 'piped' as these weren't specified
  if (envType === 'production') {
    app.use(morgan('combined'));
  } else {
    app.use(morgan(':date[iso] :method :url :status :response-time ms'));
  }

  // Implementing routes
  app.use('/api/v1/breweries', breweriesRoute);
  app.use('/api/v1/authenticate', authRoute);
  // Error-handling
  app.use(pageNotFound);
  app.use(errorHandler);

  return app;
};

/**
 * Starts the server
 */
export const startApp = async (): Promise<void> => {
  const app = await createApp();

  // Starting the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server now running on port ${PORT} in ${envType} mode.`));
};
