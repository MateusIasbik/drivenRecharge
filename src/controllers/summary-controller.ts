import { Request, Response } from "express";
import { getClient } from "../repositories/summary-repository";
import { getClientByCpf } from "../services/summary-service";
import httpStatus from "http-status";

export async function fetchClients(req: Request, res: Response) {

    const clients = await getClient();

    res.status(200).send(clients);
    return clients;
}

export async function getClientsByCpf(req: Request, res: Response) {

    const cpf: string = req.params.document;

    const result = await getClientByCpf(cpf);

    res.status(httpStatus.OK).send(result);
    return result;
}
