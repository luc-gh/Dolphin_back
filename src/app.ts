//API
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import loginRoutes from "./routes/loginRoute.js";
import { collectionsCreator } from "./config/databaseConnection.js";

dotenv.config({path: ".env"});

const app = express();

//Middleware
app.use(express.json());

//Cors
app.use(cors({
    origin: ['http://localhost:3000']
}));

//Database
collectionsCreator();

//Rotas
app.use('/', loginRoutes);

//Exceções:
process.on('uncaughtException', function (err) {
    console.log(err);
})

app.listen(3000, ()=>{console.log("Running at port 3000")});

export default app;
