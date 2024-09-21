import { Request, Response } from "express";
import { getClient } from "../repositories/client-repository";

export async function fetchClients(req: Request, res: Response) {

    const clients = await getClient();    

    res.status(200).send(clients);
    return clients;
}
