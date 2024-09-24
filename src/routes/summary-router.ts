import { Router } from "express";
import { fetchClients, getClientsByCpf } from "../controllers/summary-controller";

const summaryRouter = Router();

summaryRouter.get("/summary", fetchClients);
summaryRouter.get("/summary/:document", getClientsByCpf);

export default summaryRouter;