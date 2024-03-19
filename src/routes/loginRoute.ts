import express from "express";
import dotenv from "dotenv";
import {
    addUser,
    deleteUser,
    findUser,
    findUserByUsername,
    findUserId,
    putName, putPassword,
    putUsername
} from "../services/loginService.js";

dotenv.config({path: ".env"});

const app = express();
app.use(express.json());
let router = express.Router();

router.get('/login', (req, res) => {
    console.log("GET login request trial started.");
    return res.status(200).send({message: "Requisição GET login OK"});
});

router.post('/login', async (req, res) => {
    console.log("POST login request trial started.");

    let [username, password]: [string, string] = [req.body.username, req.body.password];

    if (!username || !password) {
        res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
        return res.json("Erro: não foram recebidos os dados.");
    }

    console.log(username + " - " + password);
    let cond = await findUser(username, password).then();

    let user = await findUserByUsername(username).then();
    console.log("Condição (usuário): " + user);
    const name = user.name;

    if (!name) return res.status(404).send({message: "Erro ao acessar nome."});

    console.log(`Redirecionamento para dashboard/${name}`);
    if (cond) return res.status(200).send({name: name, username: username, command: true});  //Redireciona para dashboard de usuário
    else return res.status(405).send({message: "Não há usuário registrado com tais credenciais.", command: false});
});

router.get('/signup', (req, res) => {
    console.log("GET signin request trial started.");
    return res.status(200).send({message: "Requisição GET signin OK"});
});

router.post('/signup', async (req, res) => {
    console.log("POST signin request trial started.");

    const {name, username, password} = req.body;

    if (!name || !username || !password) {
        res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
        console.log("Não foram recebidos os dados necessários.")
    } else if (typeof name !== "string" || typeof username !== "string" || typeof password !== "string") {
        res.status(422).send({
            message: "Tipo de dado inválido."
        });
    } else if (await findUserByUsername(username).then()) {
        res.status(409).send({
            message: "Este usuário já existe"
        });
    }

    console.log("Username recebido: " + username);
    console.log("Senha recebida: " + password);

    await addUser(name, username, password)
        .then(() => res.status(200).send({message:"Usuário adicionado."}))
        .catch(err => {return res.status(500).send({message: "Erro: " + err.name});}).then()
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

router.put('/account/name', async (req, res) => {
    console.log("PUT User Name request trial started.");

    const {name, username, password, newName} = req.body;

    if (!name || !username || !password || !newName) {
        return res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
    } else if (typeof name !== "string" || typeof username !== "string" || typeof password !== "string" || typeof newName !== "string") {
        res.status(422).send({
            message: "Tipo de dado inválido."
        });
        return res.json("Erro: falha na leitura dos dados.");
    }

    let c = await putName(await findUserId(name, username, password).then(), newName).then();
    if (c) res.status(200).send({message: "Nome de usuário atualizado com sucesso."});
    else res.status(403).send({message: "Falha na atualização do nome de usuário."});
});

router.put('/account/username', async (req, res) => {
    console.log("PUT User username request trial started.");

    const {name, username, password, newUsername} = req.body;

    if (!name || !username || !password || !newUsername) {
        return res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
    } else if (typeof name !== "string" || typeof username !== "string" || typeof password !== "string" || typeof newUsername !== "string") {
        res.status(422).send({
            message: "Tipo de dado inválido."
        });;
        return res.json("Erro: falha na leitura dos dados.");
    }

    let c = await putUsername(await findUserId(name, username, password).then(), newUsername).then();
    if (c) res.status(200).send({message: "Username atualizado com sucesso."});
    else res.status(403).send({message: "Falha na atualização de Username."});
});

router.put('/account/password', async (req, res) => {
    console.log("PUT User username request trial started.");

    const {name, username, password, newPassword} = req.body;

    if (!name || !username || !password || !newPassword) {
        return res.status(400).send({
            message: "Não foram recebidos os dados necessários."
        });
    } else if (typeof name !== "string" || typeof username !== "string" || typeof password !== "string" || typeof newPassword !== "string") {
        res.status(422).send({
            message: "Tipo de dado inválido."
        });;
        return res.json("Erro: falha na leitura dos dados.");
    }

    let c = await putPassword(await findUserId(name, username, password).then(), newPassword).then();
    if (c) res.status(200).send({message: "Senha de usuário atualizada com sucesso."});
    else res.status(403).send({message: "Falha na atualização da senha de usuário."});
});

export default router;