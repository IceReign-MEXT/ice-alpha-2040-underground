const TelegramBot = require('node-telegram-bot-api');
const token = '8411660040:AAE7L3pMqp-iOV1zBVYZxzMKIBAL1Eicrw4';
const bot = new TelegramBot(token, { polling: true });

console.log("📡 VANGUARD AI: Listening for pulses...");

bot.on('message', (msg) => {
    console.log(`📩 Pulse detected from ${msg.from.username}: "${msg.text}"`);
    bot.sendMessage(msg.chat.id, "Vanguard System: Connection 100% Stable. The Architect is here.");
});
