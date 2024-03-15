//API
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import loginRoutes from "./routes/loginRoute.js";
import noteRoutes from "./routes/noteRoute.js";
import { collectionsCreator } from "./config/databaseConnection.js";

dotenv.config({path: ".env"});

const app = express();

//Middleware
app.use(express.json());

//Cors
app.use(cors());

//Database
const cc = collectionsCreator();
cc.then(()=>{
    console.log("Coleções verificadas.");
});

//Rotas
app.use('/', [loginRoutes, noteRoutes]);

//Exceções:
process.on('uncaughtException', function (err) {
    console.log(err);
})

app.listen(27017, ()=>{console.log("Running at port 27017")});

export default app;
