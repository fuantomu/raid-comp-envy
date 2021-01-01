import { NextFunction, Request, Response } from "express";
import { Errors } from "typescript-rest";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof Error) {
    console.error(err);
  }
  res.set("Content-Type", "application/json");
  const statusCode = err?.statusCode ?? 500;
  const message = err?.message ?? err ?? "Internal Server Error";
  res.status(statusCode);
  res.json({ error: message, code: statusCode });
};

export const undefinedHandler = (req: Request, res: Response, next: NextFunction) => {
   if (res.headersSent) {
    return;
  }
  errorHandler(new Errors.ForbiddenError(), req, res, next);
};