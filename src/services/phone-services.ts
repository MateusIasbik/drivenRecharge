import { PhoneData } from "../protocols";
import { conflictError, invalidError } from "../errors/error";
import { createClient, getClientIdByCpf, getNewPhones, getPhonesByClientId, insertPhone, phoneExists, selectCarrier } from "../repositories/phone-repository";

export async function createPhone(phoneData: PhoneData) {
    const clientExists = await getClientIdByCpf(phoneData.cpf);
    if (!clientExists) throw invalidError("Cliente")

    const numberPhones = await getPhonesByClientId(clientExists);
    
    if (numberPhones.length >= 3) {
        throw conflictError("Telefone");
    }

    for (const phoneNumber of phoneData.phone) {
        const exists = await phoneExists(phoneNumber);
        if (exists) throw conflictError("Telefone");
    }

    const clientId = await createClient(phoneData.cpf);

    // Seleciona o ID da operadora
    const carrierId = await selectCarrier(phoneData.carrier);
    if (!carrierId) {
        throw invalidError("Operadora"); // Lança erro se a operadora não for encontrada
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
    if (!clientId) throw invalidError("Cliente")

    const result = await getPhonesByClientId(clientId);
    
    console.log(result);

    return result;
}