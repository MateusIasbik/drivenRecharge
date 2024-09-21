import { insertClient } from "../repositories/client-repository";
import { PhoneData } from "../protocols";

// export async function createClient(phoneData: PhoneData) {
//     const newClient = await insertClient(phoneData);
//     return newClient;
// }

// export async function createPhone(phoneData: PhoneData) {
//     const newPhone = await insertPhone(phoneData);

//     const existingCpf = await getOrCreateClient(phoneData.cpf);

//     if (existingCpf.rows.length >= 0) throw conflictError("CPF");

//     return newPhone;
// }