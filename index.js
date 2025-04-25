require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const channelLinks = {
  SCTV: 'https://example.com/embed/sctv',
  RCTI: 'https://example.com/embed/rcti',
  TRANS7: 'https://example.com/embed/trans7'
};

bot.onText(/\/playtv (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const channel = match[1].toUpperCase();

  if (channelLinks[channel]) {
    const link = channelLinks[channel];
    bot.sendMessage(chatId, `Streaming ${channel}:\n${link}`);
  } else {
    bot.sendMessage(chatId, `Channel tidak ditemukan.\nTersedia: ${Object.keys(channelLinks).join(', ')}`);
  }
});
