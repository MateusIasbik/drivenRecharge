import { validateSchema } from "../middleware/schema-middleware";
import {Router} from "express";
// import phoneSchema from "../schemas";
import { fetchClients } from "../controllers/clients-controller";

const clientsRouter = Router();

// clientsRouter.post("/document", validateSchema(phoneSchema), createClients);
clientsRouter.get("/document", fetchClients);

export default clientsRouter;