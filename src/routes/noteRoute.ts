import express from "express";
import dotenv from "dotenv";
import * as noteService from "../services/noteService.js";

dotenv.config({path: ".env"});

const app = express();
app.use(express.json);
let router = express.Router();

//Dashboard
router.get("/dashboard", (req, res) => {
    return res.status(200).send({message: "GET /dashboard OK"});
});

//Add nota
router.post("/dashboard/new", (req, res) => {

});

//Abrir nota
router.get("/notes/:id", (req, res) => {

});

//Editar titulo
router.put("/notes/:id/title", (req, res) => {

});

//Editar conteúdo
router.put("/notes/:id/content", (req, res) => {

});

//Voltar
router.get("/notes/:id/dashboard", (req, res) => {

});

//Apagar nota
router.delete("/dashboard/delete/:id", (req, res) => {

});

//Salvar nota
router.put("/notes/:id/save", (req, res) => {

});

export default router;