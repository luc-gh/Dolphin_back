import dotenv from "dotenv";
import {Collection, Db, MongoClient} from "mongodb";
import {getDBData} from "../config/databaseConnection.js";

dotenv.config({path: ".env"});

export async function createNote(){
    const patternName: string = "Novo título";

    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    if (!notes) {
        throw new Error('Collection "notes" não encontrada');
    }

    const result = await notes.insertOne({ title: patternName, content: "", date: Date.now().toString() });
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

    console.log("Atualização: " + notes.findOne({_id: noteId}).toArray());

    return notes.findOne({_id: noteId}).content == newContent;
}

export async function deleteNote(noteId: string): Promise<boolean> {
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    await notes.deleteOne({_id: noteId});

    return notes.findOne({_id: noteId});
}

export async function save(){

}