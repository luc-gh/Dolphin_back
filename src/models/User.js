const mongoose = require('mongoose');
const {Types} = require("mongoose");

let schema = new mongoose.Schema({
    id: {type: Number, default: Types.ObjectId()},
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    dataDeCadastro: {type: Date, default: Date.now()}
});

let user = mongoose.model('User', schema);
module.exports = user;