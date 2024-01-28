import express from "express";
import dotenv from "dotenv";
dotenv.config({path: ".env"});

const app = express();

export function run(){
    app.listen(process.env.SERVER_PORT, () => {
        console.log("Servidor ativo na porta " + process.env.SERVER_PORT);
    });
}