import { Request, Response, NextFunction } from "express";
import { RechargeData } from "../protocols";
import { getRechargeByPhoneNumber, postRecharge } from "../services/recharge-service";
import httpStatus from "http-status";

export async function createRecharge(req: Request, res: Response, next: NextFunction) {

    const rechargeData = req.body as RechargeData;

    try {
        const recharge = await postRecharge(rechargeData);
        res.status(httpStatus.CREATED).send(recharge);
    } catch (err) {
        next(err);
    }
}

export async function getNewRechargeByPhoneNumber(req: Request, res: Response, next: NextFunction) {

    const numberPhone: string = req.params.number;
    // const rechargeData = req.body as RechargeData;

    try {
        const recharges = await getRechargeByPhoneNumber(numberPhone);
        res.status(httpStatus.OK).send(recharges);
    } catch (err) {
        next(err);
    }
}