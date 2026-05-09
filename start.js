const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Render uchun mitti server
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('IDSavdo boti muvaffaqiyatli ishlamoqda!'));
app.listen(port, () => console.log(`Server ${port}-portda ishga tushdi`));

// --- BOT KODI ---
const token = '8674436820:AAE3qClPc0S13w3BRIQnhtlImOo_lZ0NDMs';
const bot = new TelegramBot(token, {polling: true});

// Foydalanuvchi /start bosganda faqat xabar yuborish
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // HTML formatidagi matn (<blockquote> tegi iqtibos uchun)
  const xabar = `Assalomu Alekum!\nIDSavdo ga Xush Kelibsiz!\nBu yerda siz:\n\n<blockquote>Xar hil turdagi Akkunt va boshqa narsalarni topishingiz va sotishingiz mumkin</blockquote>\n\nHoziroq Dokonga oʻting\n👇`;

  // sendMessage funksiyasi orqali matnni HTML formatida yuboramiz
  bot.sendMessage(chatId, xabar, {
    parse_mode: 'HTML'
  });
});

// Xatoliklarni konsolda ko'rish uchun (agar ulanishda muammo bo'lsa)
bot.on('polling_error', (error) => {
  console.log('Bot ulanishida xatolik:', error.code);
});

console.log('Bot sozlamalari yuklandi...');
