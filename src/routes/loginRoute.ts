import express from "express";
import dotenv from "dotenv";
import {addUser, deleteUser, findUser, putUser} from "../services/loginService.js";

dotenv.config({path: ".env"});

const app = express();

app.use(express.json());

let router = express.Router();

router.get('/login', (req, res) => {
    console.log("GET login request trial started.");
    return res.status(200).send({message: "Requisição GET login OK"});
});

router.post('/login', (req, res) => {
    console.log("POST login request trial started.");

    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
        console.log("Não foram recebidos os dados necessários.")
        return res.json("Erro: não foram recebidos os dados.");
    }

    findUser(username, password)
        .then(r => {
            if (r) return res.status(200).json("Usuário encontrado.");
            else return res.status(404).json("Não foi encontrado usuário.");
        })
        .catch(err => {
            return res.status(500).json("Erro detectado: " + err.name)
        })
    ;

});

router.post('/signin', (req, res) => {
    console.log("POST signin request trial started.");

    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
        console.log("Não foram recebidos os dados necessários.")
        return res.json("Erro: não foram recebidos os dados.");
    }
    console.log("Username recebido: " + username);
    console.log("Senha recebida: " + password);

    addUser(username, password)
        .then(() => res.status(200).json("Usuário adicionado."))
        .catch(err => {return res.status(500).json("Erro: " + err.name);})
    ;
});

router.delete('/account', (req, res) => {
    console.log("DELETE User request trial started.");

    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
        console.log("Não foram recebidos os dados necessários.")
        return res.json("Erro: não foram recebidos os dados.");
    }

    deleteUser(username, password)
        .then(r => {
            return res.json("Usuário deletado.");
        })
        .catch(err => {
            return res.status(402).json("Erro detectado: " + err.name)
        })
    ;
});

router.put('/account', (req, res) => {
    console.log("PUT User request trial started.");

    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
        console.log("Não foram recebidos os dados necessários.")
        return res.json("Erro: não foram recebidos os dados.");
    }

    putUser(username, password)
        .then(r => {
            return res.status(200).json("Usuário atualizado.")
        })
        .catch(err => {
            return res.status(404).json("Erro detectado: " + err.name)
        })
    ;
});

export default router;