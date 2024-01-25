import * as db from "../config/database";
import express from "express";

let app = express();

//Chama o e verifica conexão com o db
async function main() {
    //app.use("/users", userService);
    await db.run();
}