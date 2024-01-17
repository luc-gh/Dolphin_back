const { run } = require('../config/database');

//Chama o e verifica conexão com o db
async function main(){
    await run();
}
