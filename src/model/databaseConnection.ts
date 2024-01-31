import {MongoClient, ServerApiVersion} from "mongodb";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const uri = "mongodb+srv://"+ process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@testdb.yi4lw6o.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function run() {
    try {
        await client.connect(); //Conexão cliente-servidor
        await client.db("admin").command({ping: 1});
        console.log("Conectado ao MongoDB!");
        return [client, client.db("Data")] as any;
    } catch (err) {
        await client.db("TestDB").command({ping: 0});
        console.log("Erro detectado: " + err);
    } finally {
        await client.close();
    }
    return null;
}

run().catch(console.dir);
