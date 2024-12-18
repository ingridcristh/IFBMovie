const express = require("express");
const Filme = require("../models/Filme");

const router = express.Router();

// Rota 1: Get todos os filmes
router.get("/filmes", async (req, res) => {
    try {
        const filmes = await Filme.find();
        res.json(filmes);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rota 2: Get filme por ID
router.get("/filmes/:id", async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.id);
        if (!filme) {
            return res.status(404).send("Filme não encontrado");
        }
        res.json(filme);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rota 3: Criar filme
router.post("/filmes", async (req, res) => {
    const { title, overview, poster_path, rating, release_date, runtime, genre } = req.body;
    const filme = new Filme({ title, overview, poster_path, rating, release_date, runtime, genre });

    try {
        const newFilme = await filme.save();
        res.status(201).json(newFilme);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Rota 4: Atualizar filme por ID
router.put("/filmes/:id", async (req, res) => {
    try {
        const filme = await Filme.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!filme) {
            return res.status(404).send("Filme não encontrado");
        }
        res.json(filme);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rota 5: Deletar filme por ID
router.delete("/filmes/:id", async (req, res) => {
    try {
        const filme = await Filme.findByIdAndDelete(req.params.id);
        if (!filme) {
            return res.status(404).send("Filme não encontrado");
        }
        res.send("Filme excluído com sucesso");
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rota 6: Filmes populares (simulação)
router.get("/filmes/populares", async (req, res) => {
    try {
        const filmes = await Filme.find().sort({ rating: -1 }).limit(5); // Ordenar por rating
        res.json(filmes);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rota 7: Filmes lançados recentemente
router.get("/filmes/lançamentos", async (req, res) => {
    try {
        const filmes = await Filme.find().sort({ release_date: -1 }).limit(5); // Ordenar por data de lançamento
        res.json(filmes);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rota 8: Filmes por gênero
router.get("/filmes/generos", async (req, res) => {
    try {
        const generos = await Filme.distinct("genre");
        res.json(generos);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rota 9: Filmes por gênero específico
router.get("/filmes/genero/:genero", async (req, res) => {
    try {
        const filmes = await Filme.find({ genre: req.params.genero });
        res.json(filmes);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rota 10: Filmes com melhores avaliações
router.get("/filmes/avaliados", async (req, res) => {
    try {
        const filmes = await Filme.find().sort({ rating: -1 }).limit(10);
        res.json(filmes);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rota 11: Adicionar à watchlist (simulação de relação com usuário)
router.post("/watchlist/:usuarioId", (req, res) => {
    // Simulação: Adiciona um filme à watchlist do usuário
    res.send("Filme adicionado à sua Watchlist");
});

// Rota 12: Obter filmes da watchlist
router.get("/watchlist/:usuarioId", (req, res) => {
    // Simulação: Retorna todos os filmes na watchlist de um usuário
    res.json([{ title: "Exemplo de filme na Watchlist" }]);
});

module.exports = router;
