import { run } from '../model/databaseConnection.js';
import { Collection, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export async function addUser(login: string, password: string) {
    try {
        const db: Db | null = await run(); // Aguarde a Promise ser resolvida

        if (db) {
            const cn = process.env.COLLECTION_NAME || ''; // Use || para fornecer um valor padrão
            let collection: Collection = db.collection(cn);

            // Recupera todos os documentos da coleção e os coloca em um array
            const docs = await collection.find({}).toArray();

            console.log('Documentos da coleção:');
            console.log(docs);

            // Teste de adição de um novo documento à coleção
            let newValue = {
                name: 'novo',
                data: 'newData',
                value: 50,
            };

            // Insere o novo documento na coleção
            const result = await collection.insertOne(newValue);
            console.log('Novo dado inserido: ' + result.insertedId);
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    } finally {
        console.log("Inserção completa, se feita corretamente.")
    }
}
