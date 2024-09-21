import { Request, Response } from "express";
import { PhoneData } from "../protocols";
// import { createClient } from "../services/client-service";
import { getClient } from "../repositories/client-repository";
import { getPhonesByCpf } from "repositories/phone-repository";

export async function fetchClients(req: Request, res: Response) {

    const clients = await getClient();    

    res.status(200).send(clients);
    return clients;
}
