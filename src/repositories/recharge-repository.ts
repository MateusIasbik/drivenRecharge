import { RechargeData } from "../protocols";
import db from "../database";

async function phoneExists(phone_id: string) {
    const numberId = Number(phone_id);

    const result = await db.query< {id: string} >(`
        SELECT * FROM phones WHERE id = $1
    `, [numberId]);

    return result.rows.length > 0;
}

async function postRecharges(rechargeData: RechargeData) {
    const { phone_id, amount } = rechargeData;

    const result = await db.query<RechargeData>(`
        INSERT INTO recharges (phone_id, amount) 
        VALUES ($1, $2)
        RETURNING *
    `, [phone_id, amount]);

    return result.rows[0];
}

async function getRechargesByPhoneNumber(numberPhone: string) {
    const result = await db.query<RechargeData>(`
            SELECT * FROM recharges WHERE phone_id = (SELECT id FROM phones WHERE phone_number = $1)
        `, [numberPhone]);

    return result.rows;
}


const rechargesRepository = {
    phoneExists,
    postRecharges,
    getRechargesByPhoneNumber
}

export default rechargesRepository;