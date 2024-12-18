const mongoose = require("mongoose");

const filmeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    overview: String,
    poster_path: String,
    rating: Number,
    release_date: Date,
    runtime: Number,
    genre: String,
});

const Filme = mongoose.model("Filme", filmeSchema);

module.exports = Filme;
