import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import ejs from "ejs";
import url from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

let __dirname = path.dirname(url.fileURLToPath(import.meta.url));  //Configura o nome do diretório

dotenv.config({path: ".env"});  //Configura a leitura de variáveis de ambiente

const app = express();
let clientUrl = process.env.BASE_HTTP + ":" + process.env.CLIENT_PORT
let serverUrl = process.env.BASE_HTTP + ":" + process.env.SERVER_PORT;

//Configuração do proxy
const apiProxy = createProxyMiddleware(serverUrl, {
    target: clientUrl,
    changeOrigin: true
});

app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET_KEY as string,  //'as string' impede o erro de compilação por indefinição (undefined)
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', apiProxy);

//HTML render
app.engine('html', ejs.renderFile);           //pede ao ejs para ler um arquivo HTML
app.set("view engine", 'html');                   //indica que a leitura será de um arquivo HTML
app.set('views', path.join(__dirname, "views"));  //views é um nome de diretório padrão para esse tipo de leitura

export let getLogin = () => {
    app.get(serverUrl, (req, res) => {
        console.log("GET");
    });
}

export let postLogin = () => {
    app.post(clientUrl,(req, res, next) => {
        console.log("POST - Login: " + req.body.login);
    });
}
export let run = () => {
    app.listen(process.env.CLIENT_PORT, () => {
        console.log(clientUrl);
        console.log("Servidor ativo na porta " + process.env.SERVER_PORT);
        //console.log("apiProxy: " + apiProxy);
        postLogin();
    });
}