import express from "express";
import dotenv from "dotenv";
import {Collection, Db, MongoClient} from "mongodb";
import {getDBData} from "../config/databaseConnection.js";

dotenv.config({path: ".env"});

const app = express();

export async function createNote(){
    const patternName: string = "Novo título";

    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    if (!notes) {
        throw new Error('Collection "notes" não encontrada');
    }

    const result = await notes.insertOne({ title: patternName, content: "", data: Date.now() });
    return result.insertedId;
}

export async function findNoteById(id: string){
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    if (!notes) {
        throw new Error('Collection "notes" não encontrada');
    }

    return await notes.findOne({_id: id}); // Retorna a nota encontrada ou null se não for encontrada
}