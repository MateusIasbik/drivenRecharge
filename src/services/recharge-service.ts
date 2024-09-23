import { getRechargesByPhoneNumber, phoneNewExists, postRecharges } from "../repositories/recharge-repository";
import { RechargeData } from "../protocols";
import { invalidError } from "../errors/error";


export async function postRecharge(rechargeData: RechargeData) {

    const exists = await phoneNewExists(rechargeData.phone_id);
    if (!exists) throw invalidError("Telefone");

    const result = await postRecharges(rechargeData);
    return result;
}

export async function getRechargeByPhoneNumber(numberPhone: string) {
    const result = await getRechargesByPhoneNumber(numberPhone);
    // values.push(result);
    return result;
}