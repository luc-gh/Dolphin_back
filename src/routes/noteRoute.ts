import express from "express";
import dotenv from "dotenv";
import * as noteService from "../services/noteService.js";
import {changeContent, changeTitle, createNote, findNoteById, getIdByInfo} from "../services/noteService.js";

dotenv.config({path: ".env"});

const app = express();
app.use(express.json);
let router = express.Router();

//Dashboard
router.get("/dashboard/:user", (req, res) => {
    return res.status(200).send({message: "GET /dashboard OK"});
});

//Add nota
router.post("/dashboard/:user/new", async (req, res) => {
    try {
        const id: string = await createNote(); // Cria uma nova nota e obtém seu ID
        if (await findNoteById(id)) {
            res.status(201).redirect(`/notes/${id}`); // Redireciona para a página da nova nota
        } else {
            res.status(500).send({ message: "Erro na criação da nota." });
        }
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).send({ message: "Erro na criação da nota." });
    }
});

//Selecionar nota (pegar ID)
router.get("/dashboard/:user/:noteTitle/:date", async (req, res) => {
    let [title, date] = [req.params.noteTitle, req.params.date];
    let id = await getIdByInfo(title, date).then();
    if (await findNoteById(id).then()) return res.status(200).send(id);
    else return res.status(404).send({message: "ID não encontrada."});
});

//Abrir nota
router.get("/notes/:user/:noteId", async (req, res) => {
    const noteId = req.params.noteId;
    if (await findNoteById(noteId)) return res.status(200).send({message: "Nota aberta."});
    else return res.status(500).send({message: "Erro ao acessar nota."});
});

//Editar titulo
router.put("/notes/:user/:noteId/:title", async (req, res) => {
    let [note, title] = [req.params.noteId, req.params.title];
    if (await changeTitle(note, title).then()) res.status(200).send({message: "Título alterado."});
    else res.status(500).send({message: "Erro ao alterar título."});
});

//Editar conteúdo
router.put("/notes/:user/:noteId/content", async (req, res) => {
    let [note, content] = [req.params.noteId, req.body];
    if (await changeContent(note, content).then()) res.status(200).send({message: "Conteúdo alterado."});
    else res.status(500).send({message: "Erro ao alterar conteúdo."});
});

//Voltar
router.get("/notes/:user/dashboard", (req, res) => {
    return res.status(200).redirect("/dashboard/:user");
});

//Apagar nota
router.delete("/dashboard/:user/delete/:noteId", (req, res) => {

});

//Salvar nota
router.put("/notes/:user/:id/save", (req, res) => {

});

export default router;