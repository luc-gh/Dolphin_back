import express from "express";
import dotenv from "dotenv";
import {addUser, deleteUser, findUser, findUserByName, putUser} from "../services/loginService.js";

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
        return res.json("Erro: não foram recebidos os dados.");
    } else if (typeof username !== "string" || typeof password !== "string") {
        res.status(422).send({
            message: "Tipo de dado inválido."
        });
        return res.json("Erro: falha na leitura dos dados.");
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

router.post('/signin', async (req, res) => {
    console.log("POST signin request trial started.");

    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
        console.log("Não foram recebidos os dados necessários.")
        return res.json("Erro: não foram recebidos os dados.");
    } else if (typeof username !== "string" || typeof password !== "string") {
        res.status(422).send({
            message: "Tipo de dado inválido."
        });
        return res.json("Erro: falha na leitura dos dados.");
    } else if (await findUserByName(username).then()) {
        res.status(409).send({
            message: "Este usuário já existe"
        });
        return res.json("Erro: usuário já cadastrado.");
    }

    console.log("Username recebido: " + username);
    console.log("Senha recebida: " + password);

    addUser(username, password)
        .then(() => res.status(200).json("Usuário adicionado."))
        .catch(err => {return res.status(500).json("Erro: " + err.name);})
    ;
});

router.delete('/account', async (req, res) => {
    console.log("DELETE User request trial started.");

    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
        console.log("Não foram recebidos os dados necessários.")
        return res.json("Erro: não foram recebidos os dados.");
    } else if (typeof username !== "string" || typeof password !== "string") {
        res.status(422).send({
            message: "Tipo de dado inválido."
        });
        return res.json("Erro: falha na leitura dos dados.");
    }

    let c = await deleteUser(username, password).then();

    if (c) return res.status(200).send({message: "Usuário deletado."});
    else return res.status(400).send({message: "Falha na exclusão."});

});

router.put('/account', async (req, res) => {
    console.log("PUT User request trial started.");

    const {username, password, newUsername, newPassword} = req.body;

    if (!username || !password || !newUsername || !newPassword) {
        return res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
    } else if (typeof username !== "string" || typeof password !== "string" || typeof newUsername !== "string" || typeof newPassword !== "string") {
        res.status(422).send({
            message: "Tipo de dado inválido."
        });
        return res.json("Erro: falha na leitura dos dados.");
    }

    let c = await putUser(username, password, newUsername, newPassword)
        .catch(err => {
            return res.status(500).json("Erro detectado: " + err.name + "- Detalhes: " + err.message);
        });
    if (c) res.status(200).send({message: "Usuário atualizado com sucesso."});
    else res.status(403).send({message: "Falha na atualização de usuário."});
});

export default router;