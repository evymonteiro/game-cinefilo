const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado com sucesso!'))
.catch(err => console.error('Erro de conexão MongoDB:', err.message));

const scoreSchema = new mongoose.Schema({
  nickname: { type: String, required: true, maxlength: 6 },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', scoreSchema);

app.post('/scores', async (req, res) => {
  const { nickname, score } = req.body;

  if (!nickname || !score) {
    return res.status(400).json({ message: 'Nickname e pontuação são obrigatórios.' });
  }

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

app.get('/scores/top10', async (req, res) => {
  try {
    const topScores = await Score.find()
      .sort({ score: -1, date: 1 })
      .limit(10);
    res.status(200).json(topScores);
  } catch (error) {
    console.error('Erro ao buscar as maiores pontuações:', error);
    res.status(500).json({ message: 'Erro ao buscar as maiores pontuações.', error: error.message });
  }
});

module.exports = app;
