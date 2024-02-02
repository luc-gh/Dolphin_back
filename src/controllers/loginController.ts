import express from "express";
import dotenv from "dotenv";
import {addUser} from "../services/loginRoute.js";

dotenv.config({path: ".env"});

const app = express();

app.use(express.json());


//Novo usuário (rota da página de login)
app.post('/login/:login', (req, res) => {
    const {login, password} = req.body;
    if (!login || !password) res.status(400).send({
        message: "Não foram recebidos os dados necessários."
    });
    addUser(login, password).then(() => console.log("Usuário adicionado."));
});

//Tests:
app.listen(process.env.DEFAULT_PORT, () => {
    console.log("API ativa na porta " + process.env.DEFAULT_PORT + ".")
});
