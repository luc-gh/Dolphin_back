import { getDBData } from '../config/databaseConnection.js';
import {Collection, Db, MongoClient} from "mongodb";

export async function findUser(username: string, password: string) {
    try {
        // @ts-ignore
        const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

        const value = await users.findOne({ login: username, password: password });
        if (value) {
            console.log("> Usuário encontrado: ", value.toArray());
            return true;
        } else {
            console.log("> Não foi encontrado um usuário com estes dados");
            return false;
        }
    } catch (err) {
        console.error(err);
    }
    return false;
}

export async function addUser(username: string, password: string) {
    try {
        // @ts-ignore
        const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

        // Recupera todos os documentos da coleção e os coloca em um array
        let docs = await users.find({}).toArray();

        console.log('> Documentos atuais da coleção' + users.name + ': ');
        console.log(docs);

        // Insere o novo documento na coleção
        const result = await users.insertOne({username: username, password: password});
        console.log('> Novo dado inserido na coleção' + users.name + ': ' + result.insertedId);

        //Verificação de atualização:
        docs = await users.find({}).toArray();

        console.log('> Novos documentos da coleção' + users.name + ': ');
        console.log(docs);
    } catch (error) {
        console.error('> Ocorreu um erro:', error);
    } finally {
        console.log("> Inserção completa, se feita corretamente.")
    }
}

export async function deleteUser(username: string, password: string){
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    users.remove({username: username, password: password});

    //Verificação de atualização:
    let docs = await users.find({}).toArray();
    console.log('> Novos documentos da coleção:');
    console.log(docs);
}

export async function putUser(username?: string, password?: string, newUsername?: string, newPassword?: string){
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    if (username?.length !== 0) {
        users.findOneAndReplace(
            { username: String(username) },
            { $set: {username: newUsername} },
            { returnOriginal: false }
        );
        username = newUsername;
    }

    if (password?.length !== 0) {
        users.findOneAndReplace(
            { password: String(password) },
            { $set: {password: newPassword} },
            { returnOriginal: false }
        );
        password = newPassword;
    }

    console.log("Atualização de usuário: " + users.findOne({username: username, password: password}));
}

