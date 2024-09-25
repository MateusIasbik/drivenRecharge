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
    const result = await rechargesRepository.getRechargesByPhoneNumber(numberPhone);

    return result;
}

const rechargesService = {
    postRecharges,
    getRechargesByPhoneNumber
}

export default rechargesService;