import { PhoneData, PhoneResponseData } from "../protocols";
import db from "../database";

async function insertPhone(clientId: string, carrierId: string, phoneData: PhoneData) {
    const { phone, fullname, description } = phoneData;

    const insertedPhones = [];
    for (const phoneNumber of phone) {
        const result = await db.query<PhoneData>(`
            INSERT INTO phones (client_id, phone_number, carrier_id, name, description) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [clientId, phoneNumber, carrierId, fullname, description]);
        insertedPhones.push(result.rows[0]);
    }

    return insertedPhones;
}

async function getClientIdByCpf(cpf: string) {
    const result = await db.query< {id: string} >(`
        SELECT id FROM clients WHERE cpf = $1
    `, [cpf]);

    return result.rows.length > 0 ? result.rows[0].id : null;
}

async function createClient(cpf: string) {
    const insertResult = await db.query<{ id: string }>(`
        INSERT INTO clients (cpf) VALUES ($1)
        RETURNING id
    `, [cpf]);

    return insertResult.rows[0].id;
}

async function selectCarrier(carrierName: string) {
    const result = await db.query<{ id: string }>(`
        SELECT id FROM carriers WHERE name = $1
    `, [carrierName]);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0].id;
}

async function getPhones(phoneData: PhoneData) {
    const result = await db.query<PhoneData>(`
            SELECT * FROM phones;
        `);

    return result.rows;
}

async function getPhonesByClientId(clientId: string) {
    const result = await db.query<PhoneResponseData>(`
            SELECT * FROM phones WHERE client_id = $1
        `, [clientId]);

    return result.rows;
}

async function phoneExists(phoneNumber: string) {
    const result = await db.query<PhoneData>(`
                 SELECT * FROM phones WHERE phone_number = $1
            `, [phoneNumber]);

    return result.rows.length > 0;
}

const phonesRepository = {
    insertPhone,
    getClientIdByCpf,
    createClient,
    selectCarrier,
    getPhones,
    getPhonesByClientId,
    phoneExists
}

export default phonesRepository;