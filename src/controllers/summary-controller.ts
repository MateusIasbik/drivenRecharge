import { Request, Response, NextFunction } from "express";
import summaryService from "../services/summary-service";
import httpStatus from "http-status";

export async function getInfoClients(req: Request, res: Response, next: NextFunction) {

    const cpf: string = req.params.document;

    try {
        const result = await summaryService.getInfoClients(cpf);

        res.status(httpStatus.OK).send(result);
        return result;
    } catch (err) {
        next(err);
    }
}

const summaryController = {
    getInfoClients
}

export default summaryController;