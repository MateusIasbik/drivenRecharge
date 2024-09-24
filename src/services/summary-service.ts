import { getClientIdByCpf, getPhonesByClientId } from "../repositories/phone-repository";
import { getCarrierByCarrierId } from "../repositories/carriers-repository";
import { getRechargesByPhoneNumber } from "../repositories/recharge-repository";

export async function getClientByCpf(cpf: string) {

    const clientId = await getClientIdByCpf(cpf);

    const phones = await getPhonesByClientId(clientId);

    const phonePromises = phones.map(async (phone) => {
        const carrier = await getCarrierByCarrierId(phone.carrier_id.toString());

        const recharges = await getRechargesByPhoneNumber(phone.phone_number);

        return {
            number: phone.phone_number,
            name: phone.name,
            description: phone.description,
            carrier,
            recharges
        }
    })

    const phonesResult = await Promise.all(phonePromises);

    const result = {
        document: cpf,
        phones: phonesResult
    }

    return result;
}