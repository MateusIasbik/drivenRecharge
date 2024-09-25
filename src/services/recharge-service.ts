import rechargesRepository from "../repositories/recharge-repository";
import { RechargeData } from "../protocols";
import { invalidError } from "../errors/error";


async function postRecharges(rechargeData: RechargeData) {
    const exists = await rechargesRepository.phoneExists(rechargeData.phone_id);
    if (!exists) throw invalidError("Telefone");

    const result = await rechargesRepository.postRecharges(rechargeData);
    return result;
}

async function getRechargesByPhoneNumber(numberPhone: string) {
    const phoneId = await rechargesRepository.getPhoneIdByPhoneNumber(numberPhone);
    
    const result = await rechargesRepository.getRechargesByPhoneId(phoneId);
    return result;
}

const rechargesService = {
    postRecharges,
    getRechargesByPhoneNumber
}

export default rechargesService;