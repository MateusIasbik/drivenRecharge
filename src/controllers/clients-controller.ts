import { Request, Response } from "express";
import { PhoneData } from "../protocols";
import httpStatus from "http-status";
import { createClient } from "../services/client-service";
import { getClient } from "../repositories/client-repository";

export async function createClients(req: Request, res: Response) {
    const clientData = req.body as PhoneData;
    await createClient(clientData);

    res.sendStatus(httpStatus.CREATED);
}

export async function fetchClients(req: Request, res: Response) {
    const clients = await getClient();
    res.status(200).send(clients);
    return clients;
}
