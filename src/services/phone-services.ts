import { PhoneData } from "../protocols";
import { conflictError, invalidError } from "../errors/error";
import phonesRepository from "../repositories/phone-repository";

async function insertPhone(phoneData: PhoneData) {
    let clientId = await phonesRepository.getClientIdByCpf(phoneData.cpf);

    if (clientId) {
        const numberPhones = await phonesRepository.getPhonesByClientId(clientId);

        if (numberPhones.length >= 3) {
            throw conflictError("Telefone");
        }
    } else {
        clientId = await phonesRepository.createClient(phoneData.cpf);
    }

    for (const phoneNumber of phoneData.phone) {
        const exists = await phonesRepository.phoneExists(phoneNumber);
        if (exists) throw conflictError("Telefone");
    }

    const carrierId = await phonesRepository.selectCarrier(phoneData.carrier);
    if (!carrierId) {
        throw invalidError("Operadora");
    }

    const newPhone = await phonesRepository.insertPhone(clientId, carrierId, phoneData);
    return newPhone;
}

async function getPhones(phoneData: PhoneData) {
    const result = await phonesRepository.getPhones(phoneData);
    return result;
}

async function getPhonesByClientId(cpf: string) {
    const clientId = await phonesRepository.getClientIdByCpf(cpf);
    if (clientId === null) throw invalidError("Cliente");

    const result = await phonesRepository.getPhonesByClientId(clientId);
    return result;
}

const phonesService = {
    insertPhone,
    getPhones,
    getPhonesByClientId
}

export default phonesService;