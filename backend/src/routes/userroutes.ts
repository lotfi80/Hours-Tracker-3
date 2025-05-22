import express, { Request, Response, NextFunction } from "express";
import { addClient, getClients, getClient } from "../controller/client";

const router = express.Router();

router.post(
  "/:userid/clients",
  (req: Request, res: Response, next: NextFunction) => {
    addClient(req, res).catch(next);
  }
);
router.get(
  "/:userid/clients",
  (req: Request, res: Response, next: NextFunction) => {
    getClients(req, res).catch(next);
  }
);
router.get(
  "/client/:clientId",
  (req: Request, res: Response, next: NextFunction) => {
    getClient(req, res).catch(next);
  }
);

export default router;
