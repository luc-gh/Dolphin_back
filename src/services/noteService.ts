import dotenv from "dotenv";
import {Collection, Db, MongoClient, ObjectId} from "mongodb";
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

    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    let index = await notes.countDocuments({});
    console.log(index);

    if (!notes) {
        throw new Error('Collection "notes" não encontrada');
    }

    const patternName: string = "Document Title" + index;

    const result = await notes.insertOne({ title: patternName, content: "", date: dataAtualFormatada(), author: user });
    return result.insertedId;
}

export async function findNoteById(id: string): Promise<Document> {
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    if (!notes) {
        throw new Error('Collection "notes" não encontrada');
    }

    return await notes.findOne({_id: new ObjectId(id)}); // Retorna a nota encontrada ou null se não for encontrada
}

export async function changeTitle(noteId: string, newTitle: string){
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    notes.updateOne(noteId, {title: newTitle});

    console.log("Atualização: " + notes.findOne({_id: noteId}).toArray());

    return notes.findOne({_id: noteId}).title == newTitle;
}

export async function getIdByInfo(author: string, date: string, title: string): Promise<string> {
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    console.log("Autor: " + author);
    console.log("Data: " + date);
    console.log("Title: " + title);

    let note = await notes.findOne({author: author, date: date, title: title});
    console.log(note._id);
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

    await notes.deleteOne({_id: new ObjectId(noteId)});

    return await notes.findOne({_id: new ObjectId(noteId)});
}

export async function save(noteId: string, title: string, content: string){
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    let c = await notes.updateOne({_id: new ObjectId(noteId)}, {$set: {title: title, content: content}, $currentDate: { lastModified: true }} ).then();

    console.log(c);
    return;
}

export async function getNotes(user: string){
    //@ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();
    const query = {author: user};
    return await notes.find(query).toArray();
}