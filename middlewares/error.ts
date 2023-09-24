import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';

  // wrong mongodb Id
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400)
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered.`
    err = new ErrorHandler(message, 400)
  }

  // wrong jwt error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Json web token is invalid. Please try again.'
    err = new ErrorHandler(message, 400)
  }

  // jwt expire error
  if (err.name === 'TokenExpiredError') {
    const message = `JWT token expired. Please try again`;
    err = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  })
}