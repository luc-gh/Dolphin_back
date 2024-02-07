import {Db, MongoClient, ServerApiVersion} from "mongodb";
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

export async function getClientData(): Promise<[MongoClient, Db] | [null, null]> {
    try {
        return [client, client.db(process.env.DB_LOG)];
    } catch (err) {
        console.log("Erro detectado: " + err);
    } finally {
        await client.close();
    }
    return [null, null];
}

getClientData().catch(console.dir);
