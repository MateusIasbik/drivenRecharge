import phonesRepository from "../repositories/phone-repository";
import { getCarrierByCarrierId } from "../repositories/carriers-repository";
import rechargesService from "./recharge-service";

async function getInfoClients(cpf: string) {    
    const clientId = await phonesRepository.getClientIdByCpf(cpf);
    const phones = await phonesRepository.getPhonesByClientId(clientId);

    const phonePromises = phones.map(async (phone) => {
        const carrier = await getCarrierByCarrierId(phone.carrier_id.toString());
        const recharges = await rechargesService.getRechargesByPhoneNumber(phone.phone_number);

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

const summaryService = {
    getInfoClients
}

export default summaryService;