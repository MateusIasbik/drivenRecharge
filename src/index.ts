import express, { json, Request, Response } from "express";
import phonesRouter from "./routes/phones-router";
import clientsRouter from "./routes/clients-router";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => {
    res.sendStatus(200);
});

app.use(phonesRouter);
app.use(clientsRouter);

app.listen(5550, () => console.log("Server is up."));