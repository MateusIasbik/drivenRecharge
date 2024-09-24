import { getClientIdByCpf, getPhonesByClientId } from "../repositories/phone-repository";
import { getNewClientByCpf } from "../repositories/client-repository";
import { getCarrierByCarrierId } from "../repositories/carriers-repository";
import { string } from "joi";
import { getRechargesByPhoneNumber } from "../repositories/recharge-repository";
import { CarrierResponseData } from "../protocols";

export async function getClientByCpf(cpf: string) {

    const clientId = await getClientIdByCpf(cpf);

    const phones = await getPhonesByClientId(clientId);
    console.log(phones);

    const phonePromises = phones.map(async (phone) => {
        const carrier = await getCarrierByCarrierId(phone.carrier_id.toString());

        console.log(carrier);
        const recharges = await getRechargesByPhoneNumber(phone.phone_number);
        console.log(recharges);
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