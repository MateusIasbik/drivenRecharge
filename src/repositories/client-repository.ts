import { PhoneData } from "../protocols";
import db from "../database";

export async function insertClient(phoneData: PhoneData) {
    const { cpf } = phoneData;

    const result = await db.query<PhoneData>(`
        INSERT INTO clients (cpf) 
        VALUES ($1)
    `, [cpf]);

    return result.rows[0];
}

export async function getClient() {
    const result = await db.query(`
        SELECT clients.id, clients.cpf, ARRAY_AGG(phones.phone_number) AS telefones
        FROM clients
        LEFT JOIN phones ON clients.id = phones.client_id
        GROUP BY clients.id, clients.cpf
    `);

    console.log(result.rows);

    return result.rows.map(row => ({
        id: row.id,
        cpf: row.cpf,
        telefones: row.telefones || [], // Garante que a lista esteja vazia se não houver telefones
    }));
}

