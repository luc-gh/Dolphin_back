import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import ejs from "ejs";
import url from "url";

let __dirname = path.dirname(url.fileURLToPath(import.meta.url));  //configura o nome do diretório

dotenv.config({path: ".env"});  //configura a leitura de variáveis de ambiente

const app = express();
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET_KEY as string,  //'as string' impede o erro de compilação por indefinição (undefined)
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));

//HTML render
app.engine('html', ejs.renderFile);           //pede ao ejs para ler um arquivo HTML
app.set("view engine", 'html');                   //indica que a leitura será de um arquivo HTML
app.set('views', path.join(__dirname, "views"));  //views é um nome de diretório padrão para esse tipo de leitura

export let getLogin = () => {
    app.get("/", (req, res) => {
        res.render("index");
    });
}

export let postLogin = () => {
    app.post("/",(req, res, next) => {
        res.render("index");
    });
}
export let run = () => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log("Servidor ativo na porta " + process.env.SERVER_PORT);
    });
}