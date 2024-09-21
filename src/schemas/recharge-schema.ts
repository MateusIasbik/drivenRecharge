import joi from "joi";
import { RechargeData } from "../protocols";

const rechargeSchema = joi.object<RechargeData>({
    phone_id: joi.string().required(),
    amount: joi.number().min(10).max(1000).required()
    });

export default rechargeSchema;