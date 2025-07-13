import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

const ScoreSchema = new mongoose.Schema({
  nickname: { type: String, required: true, maxlength: 8 },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Score = mongoose.models.Score || mongoose.model('Score', ScoreSchema);

export default async function handler(req, res) {
  await mongoose.connect(uri);

  if (req.method === 'POST') {
    const { nickname, score } = req.body;
    if (!nickname || !score) return res.status(400).json({ message: 'Nickname e score obrigatórios' });

    const newScore = new Score({ nickname, score });
    await newScore.save();
    return res.status(201).json({ message: 'Pontuação salva com sucesso!' });
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
