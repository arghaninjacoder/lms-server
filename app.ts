import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ErrorMiddleware from './middlewares/error';

export const app = express();

// body parser
app.use(express.json({ limit: '50mb' }))


// cookie parser
app.use(cookieParser());

// Cors
app.use(cors({
  origin: process.env.ORIGIN
}))

// Testing api
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: 'Hi'
  })
})

// unknown route handling
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found.`) as any;
  err.statusCode = 404;
  next(err)
})

app.use(ErrorMiddleware)