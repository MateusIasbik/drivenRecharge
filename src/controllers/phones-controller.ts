import { Request, Response } from "express";
import { PhoneData } from "../protocols";
import { createPhone } from "../services/phone-services";
import httpStatus from "http-status";

export async function createPhones(req: Request, res: Response) {
    const phoneData = req.body as PhoneData;
    await createPhone(phoneData);

    res.sendStatus(httpStatus.CREATED);
}