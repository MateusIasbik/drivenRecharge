import { CarrierResponseData } from "protocols";
import db from "../database";


export async function getCarrierByCarrierId(carrierId: string) {
    const result = await db.query<CarrierResponseData>(`
            SELECT * FROM carriers WHERE id = $1
        `, [carrierId]);
    return result.rows;
}