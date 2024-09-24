import { Request, Response, NextFunction } from "express";
import { RechargeData } from "../protocols";
import rechargesService from "../services/recharge-service";
import httpStatus from "http-status";

async function postRecharges(req: Request, res: Response, next: NextFunction) {

    const rechargeData = req.body as RechargeData;

    try {
        const recharge = await rechargesService.postRecharges(rechargeData);
        res.status(httpStatus.CREATED).send(recharge);
    } catch (err) {
        next(err);
    }
}

async function getRechargesByPhoneNumber(req: Request, res: Response, next: NextFunction) {
    const numberPhone: string = req.params.number;

    try {
        const recharges = await rechargesService.getRechargesByPhoneNumber(numberPhone);
        res.status(httpStatus.OK).send(recharges);
    } catch (err) {
        next(err);
    }
}

const rechargesController = {
    postRecharges,
    getRechargesByPhoneNumber
}

export default rechargesController;