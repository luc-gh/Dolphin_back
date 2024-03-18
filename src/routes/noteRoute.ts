import express from "express";
import dotenv from "dotenv";
import * as noteService from "../services/noteService.js";
import {
    changeContent,
    changeTitle,
    createNote,
    deleteNote,
    findNoteById,
    getIdByInfo, getNotes, save
} from "../services/noteService.js";
import {findUserId} from "../services/loginService.js";

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
    const user = req.params.user;
    console.log("addNota user (): " + user);
    try {
        const id: string = await createNote(user); // Cria uma nova nota e obtém seu ID
        if (await findNoteById(id)) {
            res.status(201).send(id); // Redireciona para a página da nova nota
        } else {
            res.status(500).send({ message: "Erro na criação da nota." });
        }
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).send({ message: "Erro na criação da nota." });
    }
});

//Selecionar nota (pegar ID)
router.get("/dashboard/:user/getNote", async (req, res) => {
    let author= req.params.user;
    let title = req.body.title;
    let date = req.body.date;
    let id = await getIdByInfo(author, date, title).then();
    if (await findNoteById(id).then()) return res.status(200).send(id);
    else return res.status(404).send({message: "ID não encontrada."});
});

//Abrir nota
router.get("/notes/:user/:noteId", async (req, res) => {
    const user = req.params.user;
    const noteId = req.params.noteId;

    let note = await findNoteById(noteId).then();
    let title = note.title;
    //@ts-ignore
    let content = note.content;

    if (note) {
        return res.status(200).json({title: title, content: content});
    }
    else return res.status(500).send({message: "Erro ao acessar nota."});
});

//Editar titulo
router.put("/notes/:user/:noteId/title", async (req, res) => {
    let [note, title] = [req.params.noteId, req.body.title];
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
router.delete("/dashboard/:user/delete/:noteId", async (req, res) => {
    const [name, noteId] = [req.params.user, req.params.noteId];
    const [username, password] = req.body;

    let id = await findUserId(name, username, password).then();

    let c = await deleteNote(id).then();

    if (c) return res.status(200).send({message: "Nota deletada."});
    else return res.status(500).send({message: "Erro ao deletar nota."});
});

//Salvar nota
router.put("/notes/:user/save", async (req, res) => {
    let [title, content, noteId]: [string, string, string] = [req.body.title, req.body.content, req.body.noteId];

    console.log("Save trial");
    console.log("ID:" + noteId);
    console.log("title:" + title);
    console.log("Content: " + content);

    await save(noteId, title, content);
    return res.status(200).send("Modified");
});

router.get("/notes/:user", async (req, res) => {
    const user = req.params.user;
    let notes = await getNotes(user).then();
    return res.status(200).json(notes);
});

export default router;