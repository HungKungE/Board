import { NextFunction, Request, Response } from "express";

export default class CustomError extends Error {
  status;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.status) {
    res.status(err.status).json({ success: false, error: err.message });
  } else {
    res.status(500).json({ success: false, error: "Invalid Request" });
  }
};
