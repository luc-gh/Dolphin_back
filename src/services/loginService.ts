import { getClientData } from '../config/databaseConnection.js';
import {Collection, Db, MongoClient, ServerApiVersion} from "mongodb";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const uri = "mongodb+srv://oficial:" + process.env.DB_PASSWORD + "@testdb.yi4lw6o.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function findClient(login: string, password: string) {
    try {
        await client.connect();
        let db: Db = client.db(process.env.DB_LOG);

        const cn = "Collection";
        const collection: Collection = db.collection(cn);
        const value = await collection.findOne({ login: login, password: password }); // Use findOne instead of find
        if (value) {
            console.log("Value:", value);
            return;
        } else {
            console.log("No matching client found");
        }
    } catch (err) {
        console.error(err);
    }
}

export async function addUser(login: string, password: string) {
    try {
        const [client, db]: [MongoClient, Db] | [null, null] = await getClientData();  // Chamando banco de dados

        if (!client || !db) {
            console.error("[addUser] Falha na conexão com o banco de dados.");
            return;
        }

        await client.connect();  // Conectando com o cliente
        await db.command({ping: 1});

        console.info("Adição de usuário.");

        const cn = "Collection"; // "||" fornece um valor padrão
        let collection: Collection = db.collection(cn);

        // Recupera todos os documentos da coleção e os coloca em um array
        let docs = await collection.find({}).toArray();

        console.log('Documentos atuais da coleção:');
        console.log(docs);

        // Teste de adição de um novo documento à coleção
        let newValue = {
            login: login,
            senha: password
        };

        // Insere o novo documento na coleção
        const result = await collection.insertOne(newValue);
        console.log('Novo dado inserido: ' + result.insertedId);

        //Verificação de atualização:
        docs = await collection.find({}).toArray();

        console.log('Novos documentos da coleção:');
        console.log(docs);
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    } finally {
        console.log("Inserção completa, se feita corretamente.")
    }
}

export async function deleteUser(login: string, password: string){
    try {
        const [client, db]: [MongoClient, Db] | [null, null] = await getClientData();  // Chamando banco de dados

        if (!client || !db) {
            console.error("[addUser] Falha na conexão com o banco de dados.");
            return;
        }

        await client.connect();  // Conectando com o cliente
        await db.command({ping: 1});

        console.info("Adição de usuário.");

        const cn = "Collection"; // "||" fornece um valor padrão
        let collection: Collection = db.collection(cn);

        // Recupera todos os documentos da coleção e os coloca em um array
        let docs = await collection.find({}).toArray();

        console.log('Documentos atuais da coleção:');
        console.log(docs);

        // Teste de adição de um novo documento à coleção
        let value = {
            login: login,
            senha: password
        };

        //Exclusão
        if (await collection.findOne(value)) await collection.deleteOne(value);

        //Verificação de atualização
        docs = await collection.find({}).toArray();

        console.log('Novos documentos da coleção:');
        console.log(docs);
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    } finally {
        console.log("Inserção completa, se feita corretamente.")
    }
}