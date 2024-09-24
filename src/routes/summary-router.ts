import { Router } from "express";
import summaryController from "../controllers/summary-controller";

const summaryRouter = Router();

summaryRouter.get("/summary/:document", summaryController.getInfoClients);

export default summaryRouter;