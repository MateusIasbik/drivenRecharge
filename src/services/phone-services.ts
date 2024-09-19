import { PhoneData } from "../protocols";
import { insertPhone } from "../repositories/phone-repository"

export async function createPhone(phoneData: PhoneData) {
    const newPhone = await insertPhone(phoneData);
    return newPhone;
}