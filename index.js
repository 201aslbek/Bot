const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Render uchun mitti "soxta" server (Port ochamiz)
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot muvaffaqiyatli ishlamoqda!'));
app.listen(port, () => console.log(`Server ${port}-portda ishga tushdi`));

// --- BOT KODI ---
// BotFather'dan olingan API tokenni shu yerga kiritasiz
const token = '8674436820:AAE3qClPc0S13w3BRIQnhtlImOo_lZ0NDMs';

// Botni 'polling' usulida ishga tushirish
const bot = new TelegramBot(token, {polling: true});

// Foydalanuvchi /start bosganda ishlaydigan funksiya
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const ism = msg.from.first_name;

  // Botning javob xabari
  bot.sendMessage(chatId, `Salom, ${ism}! Botimizga xush kelibsiz. Men yordam berishga tayyorman!`);
});

// Bot kanalda admin qilinganda xatolik bermasligi uchun
bot.on('channel_post', (msg) => {
  console.log('Kanalga yangi xabar joylandi:', msg.text);
});

console.log('Bot sozlamalari yuklandi...');
