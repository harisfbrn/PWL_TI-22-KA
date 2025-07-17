require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Telegraf } = require('telegraf');
const Sentiment = require('sentiment');

const app = express();
const PORT = 5000;
const bot = new Telegraf(process.env.BOT_TOKEN);
const telegramChatId = process.env.TELEGRAM_CHAT_ID;
const sentiment = new Sentiment();

// kata sentiment 
const positifWords = ['bagus', 'keren', 'baik', 'mantap', 'suka', 'hebat', 'top' ];
const negatifWords = ['buruk', 'jelek', 'parah', 'kecewa', 'kurang'];

app.use(cors());
app.use(express.json());

let chatLog = [];

// fungsi analis sentiment
function analyzeSentiment(text) {
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;

  for (const word of words) {
    if (positifWords.includes(word)) score += 1;
    if (negatifWords.includes(word)) score -= 1;
  }

  const label = score > 0 ? 'Positif' : score < 0 ? 'Negatif' : 'Netral';

  return { score, label };
}

// Aturan balasan manual (bisa kamu ubah sesuka hati)
function getBotReply(message) {
  if (message.includes('halo')) return 'Halo juga! Ada yang bisa saya bantu?';
  if (message.includes('hai')) return 'Hai juga! Ada yang bisa saya bantu?';
  if (message.includes('kamu siapa')) return 'Saya chatbot pintar buatan pak RT. ada yang bisa saya bantu?';
  if (message.includes('kamu bisa bantu apa')) return 'Saya bisa bantu menjawab pertanyaan dan klasifikasi sentimen pesan kamu.';
  if (message.includes('saya ingin bicara dengan pak RT')) return 'baik tunggu sebentar ya 😊';
  if (message.includes('oke')) return 'apa pendapatmu tentang saya? 😊';

  if (message.includes('kurang')) return 'Mohon maaf jika ada yang kurang berkenan 😔';
  if (message.includes('jelek')) return 'Mohon maaf jika ada yang kurang berkenan 😔';
  if (message.includes('buruk')) return 'Mohon maaf jika ada yang kurang berkenan 😔';
  if (message.includes('kecewa')) return 'Mohon maaf jika ada yang kurang berkenan 😔';
  if (message.includes('parah')) return 'Mohon maaf jika ada yang kurang berkenan 😔';

  if (message.includes('bagus')) return 'Terima kasih! Senang bisa membantu 😊';
  if (message.includes('baik')) return 'Terima kasih! Senang bisa membantu 😊';
  if (message.includes('keren')) return 'Terima kasih! Senang bisa membantu 😊';
  if (message.includes('mantap')) return 'Terima kasih! Senang bisa membantu 😊';
  if (message.includes('suka')) return 'Terima kasih! Senang bisa membantu 😊';
  if (message.includes('hebat')) return 'Terima kasih! Senang bisa membantu 😊';
  if (message.includes('top')) return 'Terima kasih! Senang bisa membantu 😊';

  return 'Maaf, saya belum mengerti. Pak RT akan segera membalas.';
}

// Web user mengirim pesan
app.post('/api/message', async (req, res) => {
  const userMessage = req.body.message;

  // Gunakan fungsi manual
  const { score, label: sentimentLabel } = analyzeSentiment(userMessage);
  const botReply = getBotReply(userMessage);

  const entry = {
    user: userMessage,
    bot: botReply,
    sentiment: sentimentLabel,
    score,
    time: new Date()
  };

  chatLog.push(entry);

  // Forward ke Telegram
  const messageToTelegram = `
📥 Pesan Baru dari Web:
👤 User: ${userMessage}
🤖 Bot: ${botReply}
💬 Sentimen: ${sentimentLabel} (${score})
  `.trim();

  try {
    await bot.telegram.sendMessage(telegramChatId, messageToTelegram);
  } catch (err) {
    console.error('Gagal kirim ke Telegram:', err.message);
  }

  res.json(entry);
});




// Ambil riwayat
app.get('/api/messages', (req, res) => {
  res.json(chatLog.slice(-50));
});

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
