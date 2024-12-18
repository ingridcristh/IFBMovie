const Filme = require("../models/Filme");

// Buscar filmes
const getFilmes = async (req, res) => {
    try {
        const filmes = await Filme.find();
        res.json(filmes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar filmes" });
    }
};

// Criar um novo filme
const createFilme = async (req, res) => {
    try {
        const novoFilme = new Filme(req.body);
        await novoFilme.save();
        res.status(201).json(novoFilme);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar filme" });
    }
};

module.exports = { getFilmes, createFilme };
