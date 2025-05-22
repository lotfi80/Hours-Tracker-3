import express, { Request, Response, NextFunction } from "express";
import { addTime, getTimeEntriesByClient } from "../controller/timeEntry";

const router = express.Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  addTime(req, res, next).catch(next);
});

router.get("/:clientId", (req: Request, res: Response, next: NextFunction) => {
  getTimeEntriesByClient(req, res, next).catch(next);
});
export default router;
