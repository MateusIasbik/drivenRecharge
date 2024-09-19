import { validateSchema } from "../middleware/schema-middleware";
import { createPhones } from "../controllers/phones-controller";
import {Router} from "express";
import phoneSchema from "../schemas";

const phonesRouter = Router();

phonesRouter.post("/phones", validateSchema(phoneSchema), createPhones);

export default phonesRouter;