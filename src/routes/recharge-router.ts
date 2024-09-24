import { validateSchema } from "../middleware/schema-middleware";
import { createRecharge, getNewRechargeByPhoneNumber } from "../controllers/recharge-controller";
import { Router } from "express";
import rechargeSchema from "../schemas/recharge-schema";

const rechargeRouter = Router();

rechargeRouter.post("/recharges", validateSchema(rechargeSchema), createRecharge);
rechargeRouter.get("/recharges/:number", getNewRechargeByPhoneNumber);

export default rechargeRouter;