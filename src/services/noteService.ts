import dotenv from "dotenv";
import {Collection, Db, MongoClient} from "mongodb";
import {getDBData} from "../config/databaseConnection.js";

dotenv.config({path: ".env"});

function dataAtualFormatada() {
    let data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes  = (data.getMonth() + 1).toString(),
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return `${diaF}-${mesF}-${anoF}`;
}

export async function createNote(user: string){
    const patternName: string = "Document Title";

    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    if (!notes) {
        throw new Error('Collection "notes" não encontrada');
    }

    const result = await notes.insertOne({ title: patternName, content: "", date: dataAtualFormatada(), author: user });
    return result.insertedId;
}

export async function findNoteById(id: string): Promise<Document> {
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    if (!notes) {
        throw new Error('Collection "notes" não encontrada');
    }

    return await notes.findOne({_id: id}); // Retorna a nota encontrada ou null se não for encontrada
}

export async function changeTitle(noteId: string, newTitle: string){
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    notes.updateOne(noteId, {title: newTitle});

    console.log("Atualização: " + notes.findOne({_id: noteId}).toArray());

    return notes.findOne({_id: noteId}).title == newTitle;
}

export async function getIdByInfo(title: string, date: string): Promise<string> {
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    let note = notes.findOne({title: title, date: date});
    return note._id;
}

export async function changeContent(noteId: string, newContent: string){
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    notes.updateOne(noteId, {content: newContent});

    console.log("Update: " + notes.findOne({_id: noteId}).toArray());

    return notes.findOne({_id: noteId}).content == newContent;
}

export async function deleteNote(noteId: string): Promise<boolean> {
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    await notes.deleteOne({_id: noteId});

    return notes.findOne({_id: noteId});
}

export async function save(noteId: string, title: string, content: string){
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    await users.updateOne(
        { _id: noteId },
        { $set: {title: title, content: content} },
        { returnOriginal: false }
    );

    return;
}

export async function getNotes(user: string){
    //@ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();
    const query = {author: user};
    return await notes.find(query).toArray();
}