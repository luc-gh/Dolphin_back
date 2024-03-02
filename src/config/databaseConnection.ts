import {Db, MongoClient, ServerApiVersion} from "mongodb";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const uri = process.env.DB_URL;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function getClientData(): Promise<[MongoClient, Db] | [null, null]> {
    try {
        return [client, client.db("TestDB")];
    } catch (err) {
        console.log("Erro detectado: " + err);
    } finally {
        await client.close();
    }
    return [null, null];
}

getClientData().catch(console.dir);
