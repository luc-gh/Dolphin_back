import express from "express";
import dotenv from "dotenv";
import {addUser} from "../controllers/loginController.js";

dotenv.config({path: ".env"});

const app = express();

app.use(express.json());

//Novo usuário (rota da página de login)
export async function postUser(){
    app.post('/login/:login', (req, res) => {
        const {login, password} = req.body;
        if (!login || !password) res.status(400).send({
            message: "Login criado com sucesso."
        });
        //Uso do loginController para enviar dados ao banco
        addUser(login, password)
            .then(() => res.status(201).send("Usuário criado com sucesso."))
            .catch(err => res.status(400).send("Erro ao adicionar usuário: " + err))
        ;
    });
}

//Tests:
app.listen(process.env.DEFAULT_PORT, () => {
    console.log("API ativa na porta " + process.env.DEFAULT_PORT + ".")
});

