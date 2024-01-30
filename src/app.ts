//API
import express from "express";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const app = express();
const url = process.env.BASE_URL + ":" + process.env.DEFAULT_PORT;

//Middleware
app.use(express.json());

app.post('/login/:id', (req, res) => {
    const {id} = req.params;
    const {login, pass} = req.body;
    if (!login) res.status(418).send("Não foi recebido um login.");
    res.send({
        message: "Login recebido"
    })

    //Para visualizar:
    console.log("id: " + id);
    console.log("login: " + login + "\npass: " + pass);
});

app.get('/login', (req, res) => {
    res.status(200).send({
        login: "login_message"
    });
});

app.listen(process.env.DEFAULT_PORT, () => {
    console.log("API ativa na porta " + process.env.DEFAULT_PORT + ".")
});