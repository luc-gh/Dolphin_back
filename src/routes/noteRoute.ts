import express from "express";
import dotenv from "dotenv";
import * as noteService from "../services/noteService.js";

dotenv.config({path: ".env"});

const app = express();
app.use(express.json);
let router = express.Router();

//Dashboard
router.get("/dashboard/:id", (req, res) => {
    return res.status(200).send({message: "GET /dashboard OK"});
});

//Add nota
router.post("/dashboard/:id/new", (req, res) => {

});

//Abrir nota
router.get("/notes/:id/:noteId", (req, res) => {

});

//Editar titulo
router.put("/notes/:id/:noteId/title", (req, res) => {

});

//Editar conteúdo
router.put("/notes/:id/:noteId/content", (req, res) => {

});

//Voltar
router.get("/notes/:id/dashboard", (req, res) => {

});

//Apagar nota
router.delete("/dashboard/:id/delete/:noteId", (req, res) => {

});

//Salvar nota
router.put("/notes/:id/save", (req, res) => {

});

export default router;