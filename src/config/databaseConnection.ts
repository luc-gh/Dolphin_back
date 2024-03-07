import {Collection, Db, MongoClient, ServerApiVersion} from "mongodb";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const uri = process.env.DB_URI + "";

let client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function collectionsCreator(){
    console.log("> Chamada a collectionCreator()");
    const ucn = process.env.USER_COLLECTION_NAME + "";
    const ncn = process.env.NOTE_COLLECTION_NAME + "";

    const [client, database]: [MongoClient, Db] | [null, null] = await getClientData();

    if (!client || !database) {
        console.log("> Falha na conexão com o banco de dados.");
        return;
    }

    await client.connect();

    // Verifica se as coleções já existem
    const collections = await database.listCollections().toArray();
    const collectionNames = collections.map(collection => collection.name);

    if (!collectionNames.includes(ucn) || !collectionNames.includes(ncn)) {
        console.log('> Criação das coleções.');
        await database.createCollection(ucn);
        await database.createCollection(ncn);
    } else {
        console.log('> As coleções já existem.');
    }
}

async function getClientData(): Promise<[MongoClient, Db] | [null, null]> {
    client = await client.connect();
    let db = client.db(process.env.DB_NAME);
    try {
        console.log("> Chamada à getClientData()");
        return [client, db];
    }
    catch (err) {
        console.log("> Erro detectado em getClientData(): " + err);
    }
    finally {
        console.log("> getClientData() Finally");
    }
    await client.close();

    return [null, null];
}

getClientData().catch(console.dir);

export async function getDBData(){
    console.log("> Chamada a getDBData()");
    const [client, db]: [MongoClient, Db] = await getClientData().then();  // Chamando banco de dados

    if (!client || !db) {
        console.error("> Falha na conexão com o banco de dados.");
        return;
    }

    await client.connect();  // Conectando com o cliente
    await db.command({ping: 1});

    const ucn = process.env.USER_COLLECTION_NAME + "";
    const ncn = process.env.NOTE_COLLECTION_NAME + "";

    const users = db.collection(ucn);
    const notes = db.collection(ncn);

    return [client, db, users, notes];
}