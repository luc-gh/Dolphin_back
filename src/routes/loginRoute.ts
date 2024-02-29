import express, {NextFunction} from "express";
import dotenv from "dotenv";
import {addUser, findClient} from "../services/loginService.js";

dotenv.config({path: ".env"});

const app = express();

app.use(express.json());

let router = express.Router();

router.get('/login', (req, res) => {
    console.log("GET request trial started.");

    res.status(200).send({message: "Requisição GET OK"});
    console.log("GET OK");
    res.send({message: "GET OK"});
    return res.json("GET OK");
});

//Novo usuário (rota da página de login)
router.post('/login', (req, res) => {
    console.log("POST request trial started.");

    const {username, password} = req.body;
    console.log(req.body);

    if (!username || !password) {
        res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
        console.log("Não foram recebidos os dados necessários.")
        return res.json("Erro: não foram recebidos os dados.");
    }
    console.log("Username recebido: " + username);
    console.log("Senha recebida: " + password);
    addUser(username, password).then(() => res.json("Usuário adicionado."));  //Serviço

    findClient(username, password).then(r => {return res.json("Usuário encontrado.")});
});

router.delete('/login', (req, res) => {
    console.log("DELETE request trial started.");

    const {username, password} = req.body;
    console.log(req.body);

    if (!username || !password) {
        res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
        console.log("Não foram recebidos os dados necessários.")
        return res.json("Erro: não foram recebidos os dados.");
    }

    //Incompleto
});

export default router;