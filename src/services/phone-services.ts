import { PhoneData } from "../protocols";
import { getNewPhones, insertPhone } from "../repositories/phone-repository"

export async function createPhone(phoneData: PhoneData) {
    const newPhone = await insertPhone(phoneData);
    return newPhone;
}

export async function getNewPhone(phoneData: PhoneData) {
    const result = await getNewPhones(phoneData);
    return result;
}