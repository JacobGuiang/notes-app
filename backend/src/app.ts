import config from './config/config';
import express, { Request, Response, NextFunction } from 'express';
import pino from 'pino-http';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import authLimiter from './middlewares/rateLimiter';
import httpStatus from 'http-status';

const app = express();

if (config.env !== 'test') {
  app.use(pino());
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/auth', authLimiter);
}

app.get(['/status', '/api/status'], (_req, res) => {
  res.status(200).end();
});

// send back a 404 error for any unknown api request
app.use((_req, res) => {
  res.status(httpStatus.NOT_FOUND).json({ error: 'Not Found' });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
});

export default app;
