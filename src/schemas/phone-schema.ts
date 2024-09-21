import joi from "joi";
import { PhoneData } from "../protocols";

const phoneSchema = joi.object<PhoneData>({
    phone: joi.array().items().min(1).required(),
    carrier: joi.string().required(),
    fullname: joi.string().required(),
    description: joi.string().required(),
    cpf: joi.string().required()
});

export default phoneSchema;