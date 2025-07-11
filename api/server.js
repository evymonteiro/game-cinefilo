// server.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000; // Define a porta, 3000 por padrão se a env não for setada

// Middleware
app.use(cors()); // Permite requisições de diferentes origens
app.use(express.json()); 

// Conexão MongoDB

console.log('Tentando conectar ao MongoDB com URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado com sucesso!'))
.catch(err => console.error('Erro de conexão MongoDB:', err.message)); 

//Pontuação
const scoreSchema = new mongoose.Schema({
  nickname: { type: String, required: true, maxlength: 6 },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', scoreSchema);

// Endpoints da API

// 1. Enviar uma nova pontuação
app.post('/api/scores', async (req, res) => {
  const { nickname, score } = req.body;

  if (!nickname || !score) {
    return res.status(400).json({ message: 'Nickname e pontuação são obrigatórios.' });
  }

  // A validação de maxlength foi 8 no frontend e 6 no backend.
  if (nickname.length > 6) {
    return res.status(400).json({ message: 'O nickname não pode exceder 6 caracteres.' });
  }

  try {
    const newScore = new Score({ nickname, score });
    await newScore.save();
    res.status(201).json({ message: 'Pontuação salva com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar pontuação:', error);
    res.status(500).json({ message: 'Erro ao salvar pontuação.', error: error.message });
  }
});

// 2. Obter as 10 maiores pontuações
app.get('/api/scores/top10', async (req, res) => {
  try {
    const topScores = await Score.find()
      .sort({ score: -1, date: 1 }) // Ordena pela pontuação em ordem decrescente, depois pela data em ordem crescente para desempate
      .limit(10);
    res.status(200).json(topScores);
  } catch (error) {
    console.error('Erro ao buscar as maiores pontuações:', error);
    res.status(500).json({ message: 'Erro ao buscar as maiores pontuações.', error: error.message });
  }
});

module.exports = app;
