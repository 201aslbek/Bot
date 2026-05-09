const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Render yoki boshqa serverlar uchun mitti server
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('IDSavdo boti muvaffaqiyatli ishlamoqda!'));
app.listen(port, () => console.log(`Server ${port}-portda ishga tushdi`));

// --- BOT KODI ---
// Siz kiritgan API token
const token = '8674436820:AAE3qClPc0S13w3BRIQnhtlImOo_lZ0NDMs';

const bot = new TelegramBot(token, {polling: true});

// Foydalanuvchi /start bosganda rasm va xabar yuborish
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // AI pin.it qisqartmasini ocha olmagani uchun tayyor .jpg rasm qoldirildi.
  // O'zingiz xohlagan aniq .jpg rasm linkiga almashtirib olishingiz mumkin.
  const rasmLink = 'https://i.pinimg.com/736x/87/49/79/874979f4eb8c88e9ebf071f652b45037.jpg';

  // HTML formatidagi matn (<blockquote> tegi iqtibos uchun)
  const xabar = `Assalomu Alekum!\nIDSavdo ga Xush Kelibsiz!\nBu yerda siz:\n\n<blockquote>Xar hil turdagi Akkunt va boshqa narsalarni topishingiz va sotishingiz mumkin</blockquote>\n\nHoziroq Dokonga oʻting\n👇`;

  // sendPhoto funksiyasi orqali rasm va matnni HTML formatida yuboramiz
  bot.sendPhoto(chatId, rasmLink, {
    caption: xabar,
    parse_mode: 'HTML'
  });
});

// Bot kanalda admin qilinganda xatolik bermasligi va chiqib ketmasligi uchun
bot.on('channel_post', (msg) => {
  console.log('Kanalga yangi xabar joylandi:', msg.text);
});

console.log('Bot sozlamalari yuklandi...');
