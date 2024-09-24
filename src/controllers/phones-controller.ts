import { Request, Response, NextFunction } from "express";
import { PhoneData } from "../protocols";
import phonesService from "../services/phone-services";
import httpStatus from "http-status";

async function insertPhone(req: Request, res: Response, next: NextFunction) {
    const phoneData: PhoneData = req.body;
    try {
        await phonesService.insertPhone(phoneData);
        res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        next(error);
    }

}

async function getPhones(req: Request, res: Response, next: NextFunction) {
    const phoneData = req.body as PhoneData;

    try {
        const result = await phonesService.getPhones(phoneData);
        res.status(httpStatus.OK).send(result);
    } catch (err) {
        next(err);
    }
}

async function getPhonesByClientId(req: Request, res: Response, next: NextFunction) {
    const cpf: string = req.params.document;

    try {
        const result = await phonesService.getPhonesByClientId(cpf);
        res.status(httpStatus.OK).send(result);
    } catch (err) {
        next(err);
    }
}


const phonesController = {
    insertPhone,
    getPhones,
    getPhonesByClientId
}

export default phonesController;