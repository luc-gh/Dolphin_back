const User = require('../models/User');

function createUser(body){
    let user = new User();
    user.nome = body.nome;
    user.senha = body.senha;
    user.email = body.email;
    consoleUser(user);
    return user;
}

function consoleUser(user){
    console.log("Nome: " + user.nome);
    console.log("Email: " + user.email);
    console.log("Senha: " + user.senha);
}

module.exports = {createUser};