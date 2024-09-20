import { Phone, PhoneData } from "../protocols";
import db from "../database";

export async function insertClient(phoneData: PhoneData) {
    
    const { cpf } = phoneData;

    const result = await db.query<Phone>(`
        INSERT INTO clients (cpf) 
        VALUES ($1)
    `, [cpf]);
    
    return result.rows[0]; 
}

export async function getClient() {

    const result = await db.query<Phone>(`
        SELECT * FROM clients`,
    );   

    return result.rows;
}
