import type { NextFunction, Request, Response } from "express";
import { toClientError } from "../errors/httpErrors.js";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const clientError = toClientError(err);

  if (clientError) {
    res.status(clientError.statusCode).json({ error: clientError.message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};
