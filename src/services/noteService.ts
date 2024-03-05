import express from "express";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const app = express();

export async function createNote(){
    const patternName: string = "Novo título";

}