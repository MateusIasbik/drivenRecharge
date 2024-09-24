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

export async function getNewClientByCpf(cpf: string) {
    
    const result = await db.query(`
        SELECT
            phones.id AS phone_id,
            phones.phone_number,
            phones.name AS phone_name,
            phones.description AS phone_description,
            json_build_object(
                'id', carriers.id,
                'name', carriers.name,
                'code', carriers.code
            ) AS carrier,
            COALESCE(ARRAY_AGG(
                json_build_object(
                    'id', recharges.id,
                    'amount', recharges.amount,
                    'created_at', recharges.created_at
                )
            ), '{}'::json[]) AS recharges
        FROM
            phones
        INNER JOIN
            clients ON phones.client_id = clients.id
        INNER JOIN
            carriers ON phones.carrier_id = carriers.id
        LEFT JOIN
            recharges ON phones.id = recharges.phone_id
        WHERE
            clients.cpf = $1
        GROUP BY
            phones.id, carriers.id;
    `, [cpf]);

    return result.rows;
}
