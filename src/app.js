const { run } = require('../config/database');
const userService = require('../src/services/UserService');
const express = require('express');

let app = express();

//Chama o e verifica conexão com o db
async function main() {
    //app.use("/users", userService);
    await run();
}