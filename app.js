const express = require("express");
const mongoose = require("mongoose");
const filmeRoutes = require("./routes/filmeRoutes");

const app = express();

// Conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/watchlist", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.log("Erro de conexão: ", err));

// Middleware para parsing de JSON
app.use(express.json());

// Usar as rotas definidas
app.use("/api", filmeRoutes);

// Configuração do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
