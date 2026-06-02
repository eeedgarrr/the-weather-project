import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import {
  getCurrent,
} from "../controllers/weather.controller.js";

export const weatherRouter = Router();

weatherRouter.get("/current", getCurrent);

