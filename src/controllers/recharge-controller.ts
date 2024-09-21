import { Request, Response, NextFunction } from "express";
import { RechargeData } from "../protocols";
import { postRecharge } from "../services/recharge-service";

export async function createRecharge(req: Request, res: Response, next: NextFunction) {

    const rechargeData = req.body as RechargeData;

    try {
        const recharge = await postRecharge(rechargeData);
        res.status(201).send(recharge); // Retorna 201 Created
    } catch (err) {
        next(err); // Passa o erro para o middleware de erro
    }
}
