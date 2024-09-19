import { Request, Response } from "express";
import { PhoneData } from "../protocols";

export function createPhones(req: Request, res: Response) {
    const phoneData = req.body as PhoneData;
    res.send(phoneData.fullname);
}