import {Router} from "express";
import { fetchClients, getClientsByCpf } from "../controllers/clients-controller";

const clientsRouter = Router();

clientsRouter.get("/summary", fetchClients);
clientsRouter.get("/summary/:document", getClientsByCpf);

export default clientsRouter;