import { Phone, PhoneData } from "../protocols";
import db from "../database";
import { invalidError } from "../errors/error";

export async function insertPhone(phoneData: PhoneData) {
    const { phone, carrier, fullname, description, cpf } = phoneData;

    const clientId = await getOrCreateClient(cpf);

    // Seleciona o ID da operadora
    const carrierId = await selectCarrier(carrier);
    if (!carrierId) {
        throw invalidError("Operadora"); // Lança erro se a operadora não for encontrada
    }

    // Insere cada telefone na tabela
    const insertedPhones = []; // Array para armazenar telefones inseridos
    for (const phoneNumber of phone) { // Itera sobre cada número de telefone
        const result = await db.query<PhoneData>(`
            INSERT INTO phones (client_id, phone_number, carrier_id, name, description) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [clientId, phoneNumber, carrierId, fullname, description]);
        insertedPhones.push(result.rows[0]); // Adiciona o telefone inserido ao array
    }

    return insertedPhones; // Retorna todos os telefones inseridos
}

export async function getOrCreateClient(cpf: string) {
    const result = await db.query(`
        SELECT id FROM clients WHERE cpf = $1
    `, [cpf]);

    if (result.rows.length > 0) {
        return result.rows[0].id; // Retorna o id do cliente existente
    } else {
        // Se não encontrar, insere um novo cliente
        const insertResult = await db.query(`
            INSERT INTO clients (cpf)
            VALUES ($1)
            RETURNING id
        `, [cpf]);
        return insertResult.rows[0].id; // Retorna o id do novo cliente
    }
}

async function selectCarrier(carrierName: string) {
    const result = await db.query(`
        SELECT id FROM carriers WHERE name = $1
    `, [carrierName]);

    if (result.rows.length === 0) {
        return null; // Retorna null se não encontrar a operadora
    }
    return result.rows[0].id; // Retorna o ID da operadora encontrada
}

export async function getNewPhones(phoneData: PhoneData) {
    const result = await db.query<PhoneData>(`
            SELECT * FROM phones;
        `);

    return result.rows;
}

export async function getPhonesByCpf(phoneData: PhoneData) {
    const { cpf } = phoneData;

    const result = await db.query<PhoneData>(`
            SELECT * FROM phones WHERE client_id = (SELECT id FROM clients WHERE cpf = $1)
        `, [cpf]);

        console.log(result);
    return result.rows;
}

export async function phoneExists(phoneNumber: string) {

    const result = await db.query<PhoneData>(`
                 SELECT * FROM phones WHERE phone_number = $1
            `, [phoneNumber]);

    return result.rows.length > 0;
}