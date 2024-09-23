import {Router} from "express";
import { fetchClients } from "../controllers/clients-controller";

const clientsRouter = Router();

clientsRouter.get("/summary", fetchClients);

export default clientsRouter;