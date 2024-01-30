import express from "express";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const app = express();

app.use(express.json());

//Novo usuário (rota da página de login)
app.post('/login/:login', (req, res) => {
    const {login, password} = req.body;
    if (!login || !password) res.status(400).send({
        message: "Login criado com sucesso."
    });
    //Uso do loginController para enviar dados ao banco
});

app.listen(process.env.SERVER_PORT)

