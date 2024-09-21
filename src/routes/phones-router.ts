import { validateSchema } from "../middleware/schema-middleware";
import { createPhones, getPhones } from "../controllers/phones-controller";
import {Router} from "express";
import phoneSchema from "../schemas/phone-schema";

const phonesRouter = Router();

phonesRouter.post("/phones", validateSchema(phoneSchema), createPhones);
phonesRouter.get("/phones", getPhones);

export default phonesRouter;