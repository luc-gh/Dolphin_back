//API
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import loginRoutes from "./routes/loginRoute.js";

dotenv.config({path: ".env"});

const app = express();

//Middleware
app.use(express.json());

//Cors
app.use(cors({
    origin: ['http://localhost:3000']
}));

//Rotas
app.use('/', loginRoutes);

//Exceções:
process.on('uncaughtException', function (err) {
    console.log(err);
})

//Tests:
app.listen(process.env.SERVER_PORT, () => {
    console.log("API ativa na porta " + process.env.SERVER_PORT + ".");
});
