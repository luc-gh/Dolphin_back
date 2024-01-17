const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config({path: "../.env"})  //Carrega variáveis de ambiente conforme o caminho especificado

const uri = process.env.MONGODB_URI;

//Cria um MongoClient com um objeto MongoClientOptions para definir a versão estável da API
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        //Conexão cliente-servidor (optional starting in v4.7)
        await client.connect();

        //Enviando um ping para confirmar uma conexão bem-sucedida
        await client.db(process.env.DATABASE_NAME).command({ ping: 1 });

        console.log("Sua distribuição foi detectada. Você se conectou com sucesso ao MongoDB!");
    } finally {
        //Garante que o cliente será desconectado quando a aplicação for encerrada ou houver um erro
        await client.close();
    }
}

run().catch(console.dir);
