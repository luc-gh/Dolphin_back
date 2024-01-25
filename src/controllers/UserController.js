const userService = require('../services/UserService');
const express = require('express');
const router = express.Router();

router.post("/users", (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        userService.createUser(res.body);

    } catch (e) {
        res.send("Erro: " + e);
        res.status(500).json({error: "Erro ao criar usuário."});
    }
});

router.get("/users", (req, res) => {

});