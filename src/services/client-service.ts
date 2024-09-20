import { insertClient } from "../repositories/client-repository";
import { PhoneData } from "../protocols";

export async function createClient(phoneData: PhoneData) {
    const newClient = await insertClient(phoneData);
    return newClient;
}