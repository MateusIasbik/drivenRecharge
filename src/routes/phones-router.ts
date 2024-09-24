import { validateSchema } from "../middleware/schema-middleware";
import phonesController from "../controllers/phones-controller";
import { Router } from "express";
import phoneSchema from "../schemas/phone-schema";

const phonesRouter = Router();

phonesRouter.post("/phones", validateSchema(phoneSchema), phonesController.insertPhone);
phonesRouter.get("/phones", phonesController.getPhones);
phonesRouter.get("/phones/:document", phonesController.getPhonesByClientId);

export default phonesRouter;