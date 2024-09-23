import { Request, Response, NextFunction } from "express";
import { PhoneData } from "../protocols";
import { createPhone, getAllPhonesByNumber, getNewPhone } from "../services/phone-services";
import httpStatus from "http-status";

export async function createPhones(req: Request, res: Response, next: NextFunction) {
    const phoneData = req.body as PhoneData;
    
    try {
        await createPhone(phoneData);
        res.sendStatus(httpStatus.CREATED);
    } catch (err) {
        next(err); // Passa o erro para o middleware de erro
    }
}

export async function getPhones(req: Request, res: Response, next: NextFunction) {
    const phoneData = req.body as PhoneData;

    try {
        const result = await getNewPhone(phoneData);
        res.status(httpStatus.OK).send(result);
    } catch (err) {
        next(err); // Passa o erro para o middleware de erro
    }
}

export async function getPhonesByNumber(req: Request, res: Response, next: NextFunction) {
    const cpf: string = req.params.documet;

    try {
        const result = await getAllPhonesByNumber(cpf);
        res.status(httpStatus.OK).send(result);
    } catch (err) {
        next(err);
    }
}