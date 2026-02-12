const TelegramBot = require('node-telegram-bot-api');
// HARDCODED BYPASS
const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';
const bot = new TelegramBot(token, {polling: false});

bot.getMe().then((me) => {
    console.log("========================================");
    console.log("✅ SUCCESS: The bot is talking to Node!");
    console.log(`Bot Name: ${me.first_name}`);
    console.log("========================================");
}).catch((err) => {
    console.log("❌ FAILED: Still getting an error.");
    console.error(err.message);
});
