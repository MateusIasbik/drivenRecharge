import { RechargeData } from "../protocols";
import db from "../database";

export async function phoneNewExists(phone_id: string) {

    console.log(`Verificando se o telefone com ID ${phone_id} existe...`);

    const numberId = Number(phone_id);
    console.log(`ID convertido para número: ${numberId}`); // Log do número convertido


    const result = await db.query(`
        SELECT * FROM phones WHERE id = $1
    `, [numberId]);

    console.log(result.rows); // Verifique o que foi retornado da consulta

    return result.rows.length > 0; // Retorna true se o telefone existe
}

export async function postRecharges(rechargeData: RechargeData) {
    const { phone_id, amount } = rechargeData;

    const result = await db.query<RechargeData>(`
        INSERT INTO recharges (phone_id, amount) 
        VALUES ($1, $2)
        RETURNING *
    `, [phone_id, amount]);

    return result.rows[0];
}

export async function getRechargesByPhoneNumber(numberPhone: string) {
    const result = await db.query(`
            SELECT * FROM recharges WHERE phone_id = (SELECT id FROM phones WHERE phone_number = $1)
        `, [numberPhone]);

    return result.rows;
}



