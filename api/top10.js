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

  const topScores = await Score.find().sort({ score: -1, date: 1 }).limit(10);
  return res.status(200).json(topScores);
}
