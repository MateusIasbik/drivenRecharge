import express, { Request, Response } from "express";

const app = express();

app.get("/health", (req: Request, res: Response) => {
    res.sendStatus(200);
});

app.listen(5000, () => console.log("Server is up."));