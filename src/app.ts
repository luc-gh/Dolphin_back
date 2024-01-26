import * as fs from "fs";
import express, {Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config({path: '.env'});
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.json({
        "users": ["Lucas", "Ana", "Carlos"]
    });
});

app.listen(process.env.SERVER_PORT, () => {
    console.log("Servidor ativo na porta " + process.env.SERVER_PORT);
});
