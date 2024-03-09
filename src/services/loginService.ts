import {getDBData} from '../config/databaseConnection.js';
import {Collection, Db, MongoClient} from "mongodb";

export async function findUser(username: string, password: string) {
    try {
        // @ts-ignore
        const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();
        let value = await users.findOne({ username: username, password: password });
        if (value !== null) {
            console.log("> Usuário encontrado: ", value);
            return true;
        } else {
            console.log("> Não foi encontrado um usuário com estes dados");
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function findUserByUsername(username: string){
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();
    return users.findOne({username: username});
}

export async function findUserId(name: string, username: string, password: string){
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    let id: string = await users.findOne({name: name, username: username, password: password})._id;
    return id;
}

export async function addUser(name: string, username: string, password: string) {
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    // Recupera todos os documentos da coleção e os coloca em um array
    let docs = await users.find({}).toArray();

    console.log('> Documentos atuais da coleção' + users.name + ': ');
    console.log(docs);

    // Insere o novo documento na coleção
    const result = await users.insertOne({name: name, username: username, password: password});
    console.log('> Novo dado inserido na coleção' + users.name + ': ' + result.insertedId);

    //Verificação de atualização:
    docs = await users.find({}).toArray();

    console.log('> Novos documentos da coleção' + users.name + ': ');
    console.log(docs);
}

export async function deleteUser(username: string, password: string){
    // @ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    await users.deleteOne({username: username, password: password});

    //Verificação de atualização:
    const deletedDocument = await users.findOne({username: username, password: password});
    return deletedDocument === null;
}

export async function putName(userId: string, newName: string): Promise<boolean> {
    //@ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    if (userId !== null && newName !== null) {
        await users.updateOne(
            { _id: userId },
            { $set: {name: newName} },
            { returnOriginal: false }
        );
    }

    let user = users.findOne({_id: userId});
    return user.name == newName;
}

export async function putUsername(userId: string, newUsername: string): Promise<boolean> {
    //@ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    if (userId !== null && newUsername !== null) {
        await users.updateOne(
            { _id: userId },
            { $set: {username: newUsername} },
            { returnOriginal: false }
        );
    }

    let user = users.findOne({_id: userId});
    return user.username == newUsername;
}

export async function putPassword(userId: string, newPassword: string): Promise<boolean> {
    //@ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();

    if (userId !== null && newPassword!== null) {
        await users.updateOne(
            { _id: userId },
            { $set: {password: newPassword} },
            { returnOriginal: false }
        );
    }

    let user = users.findOne({_id: userId});
    return user.password == newPassword;
}

export async function putUser(userId: string, name: string, newName: string, username: string, password: string, newUsername: string, newPassword: string){
    //@ts-ignore
    const [client, db, users, notes]: [MongoClient, Db, Collection, Collection] | undefined = await getDBData();
    return (await putName(userId, newName).then() && await putUsername(userId, newUsername).then() && await putPassword(userId, newPassword).then());
}


