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
    const result = await db.query(`
        SELECT c.id, c.cpf, ARRAY_AGG(p.phone_number) AS telefones
        FROM clients c
        LEFT JOIN phones p ON c.id = p.client_id
        GROUP BY c.id, c.cpf
    `);

    return result.rows.map(row => ({
        id: row.id,
        cpf: row.cpf,
        telefones: row.telefones || [], // Garante que a lista esteja vazia se não houver telefones
    }));
}

