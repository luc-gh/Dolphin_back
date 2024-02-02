//API
import express from "express";
import dotenv from "dotenv";
import {postUser} from "./controllers/loginController.js";

dotenv.config({path: ".env"});

const app = express();

//Middleware
app.use(express.json());


//Tests:
app.listen(process.env.SERVER_PORT, () => {
    console.log("API ativa na porta " + process.env.SERVER_PORT + ".");
    postUser();
});
