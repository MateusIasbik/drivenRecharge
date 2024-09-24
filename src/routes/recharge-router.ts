import { validateSchema } from "../middleware/schema-middleware";
import rechargesController from "../controllers/recharge-controller";
import { Router } from "express";
import rechargeSchema from "../schemas/recharge-schema";

const rechargeRouter = Router();

rechargeRouter.post("/recharges", validateSchema(rechargeSchema), rechargesController.postRecharges);
rechargeRouter.get("/recharges/:number", rechargesController.getRechargesByPhoneNumber);

export default rechargeRouter;
