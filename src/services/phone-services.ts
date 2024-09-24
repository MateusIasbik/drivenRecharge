import { PhoneData } from "../protocols";
import { conflictError, invalidError } from "../errors/error";
import { createClient, getClientIdByCpf, getNewPhones, getPhonesByClientId, insertPhone, phoneExists, selectCarrier } from "../repositories/phone-repository";

export async function createPhone(phoneData: PhoneData) {
    let clientId = await getClientIdByCpf(phoneData.cpf);

    if (clientId) {
        const numberPhones = await getPhonesByClientId(clientId);

        if (numberPhones.length >= 3) {
            throw conflictError("Telefone");
        }
    } else {
        clientId = await createClient(phoneData.cpf);
    }

    for (const phoneNumber of phoneData.phone) {
        const exists = await phoneExists(phoneNumber);
        if (exists) throw conflictError("Telefone");
    }

    const carrierId = await selectCarrier(phoneData.carrier);
    if (!carrierId) {
        throw invalidError("Operadora");
    }

    const newPhone = await insertPhone(clientId, carrierId, phoneData);
    return newPhone;
}

export async function getNewPhone(phoneData: PhoneData) {
    const result = await getNewPhones(phoneData);
    return result;
}

export async function getAllPhonesByNumber(cpf: string) {
    const clientId = await getClientIdByCpf(cpf);
    if (clientId === null) throw invalidError("Cliente");

    const result = await getPhonesByClientId(clientId);
    return result;
}