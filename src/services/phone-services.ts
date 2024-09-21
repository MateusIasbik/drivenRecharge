import { PhoneData } from "../protocols";
import { conflictError } from "../errors/error";
import { getNewPhones, getPhonesByCpf, insertPhone, phoneExists } from "../repositories/phone-repository";

export async function createPhone(phoneData: PhoneData) {    
    const numberPhones = await getPhonesByCpf(phoneData);
    
    if (numberPhones.length >= 3) {
        throw conflictError("Telefone");
    }

    for (const phoneNumber of phoneData.phone) {
        const exists = await phoneExists(phoneNumber);
        if (exists) throw conflictError("Telefone");
    }
    
    const newPhone = await insertPhone(phoneData);
    return newPhone;
}


export async function getNewPhone(phoneData: PhoneData) {
    const result = await getNewPhones(phoneData);

    return result;
}