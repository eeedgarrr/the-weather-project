import type { NextFunction, Request, Response } from "express";
import { getCurrentWeather } from "../services/weather.service.js";
import { HkoLang } from "../types/hko/common.js";

export const getCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const weather = await getCurrentWeather(req.query.lang as HkoLang);
    res.json(weather);
  } catch (err) {
    // pass the error to the error handler
    next(err);
  }
};
