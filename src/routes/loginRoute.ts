import express from "express";
import dotenv from "dotenv";
import { addUser } from "../services/loginService.js";
import e from "express";

dotenv.config({path: ".env"});

const app = express();

app.use(express.json());

let router = express.Router();

router.get('/login', (req, res) => {
    res.status(200).send({message: "Requisição GET OK"});
    console.log("GET OK");
    res.send({message: "GET OK"});
});

//Novo usuário (rota da página de login)
router.post('/login/:login', (req, res) => {
    const {username, password} = req.body;
    console.log(req.body)
    if (!username || !password) {
        res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
        console.log("Não foram recebidos os dados necessários.")
        return {};
    }
    console.log("Username recebido: " + username);
    console.log("Senha recebida: " + password);
    addUser(username, password).then(() => console.log("Usuário adicionado."));  //Serviço
});

export default router;