// api/index.js

console.log('API Function started!'); // Log de depuração para verificar se a função inicia

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Log de depuração para verificar se a variável de ambiente está chegando
console.log('MONGODB_URI está definida:', !!process.env.MONGODB_URI);
console.log('Valor da MONGODB_URI (se definida):', process.env.MONGODB_URI ? 'Sim, está definida e tem um valor.' : 'Não, não está definida ou está vazia.');


// Conexão MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4 // Força IPv4, pode resolver problemas de DNS em alguns ambientes
})
.then(() => console.log('MongoDB conectado com sucesso!'))
.catch(err => console.error('Erro de conexão MongoDB:', err.message));

// Esquema e Modelo de Pontuação
const scoreSchema = new mongoose.Schema({
  nickname: { type: String, required: true, maxlength: 6 },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', scoreSchema);

// Endpoints da API

// 1. Enviar uma nova pontuação
app.post('/scores', async (req, res) => {
  console.log('Requisição POST /scores recebida.'); // Log quando a requisição chega
  const { nickname, score } = req.body;

  if (!nickname || !score) {
    console.error('Dados de pontuação inválidos: Nickname ou pontuação ausentes.');
    return res.status(400).json({ message: 'Nickname e pontuação são obrigatórios.' });
  }

  if (nickname.length > 6) {
    console.error('Nickname excede 6 caracteres:', nickname);
    return res.status(400).json({ message: 'O nickname não pode exceder 6 caracteres.' });
  }

  try {
    const newScore = new Score({ nickname, score });
    await newScore.save();
    console.log('Pontuação salva com sucesso para:', nickname, score);
    res.status(201).json({ message: 'Pontuação salva com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar pontuação no DB:', error); // Log mais específico para erro DB
    res.status(500).json({ message: 'Erro ao salvar pontuação.', error: error.message });
  }
});

// 2. Obter as 10 maiores pontuações
app.get('/scores/top10', async (req, res) => {
  console.log('Requisição GET /scores/top10 recebida.'); // Log quando a requisição chega
  try {
    const topScores = await Score.find()
      .sort({ score: -1, date: 1 })
      .limit(10);
    console.log('Top 10 pontuações buscadas com sucesso.');
    res.status(200).json(topScores);
  } catch (error) {
    console.error('Erro ao buscar as maiores pontuações no DB:', error); // Log mais específico para erro DB
    res.status(500).json({ message: 'Erro ao buscar as maiores pontuações.', error: error.message });
  }
});

// Exporta o aplicativo Express, essencial para o Vercel Serverless Functions
module.exports = app;
