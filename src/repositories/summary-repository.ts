import { PhoneData } from "../protocols";
import db from "../database";

async function getInfoClients(phoneData: PhoneData) {
    const { cpf } = phoneData;

    const result = await db.query<PhoneData>(`
        INSERT INTO clients (cpf) 
        VALUES ($1)
    `, [cpf]);

    return result.rows[0];
}

const summaryRepository = {
    getInfoClients
}

export default summaryRepository;