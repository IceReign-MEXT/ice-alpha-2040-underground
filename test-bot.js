const TelegramBot = require('node-telegram-bot-api');

// REPLACE THE LINE BELOW WITH YOUR ACTUAL TOKEN
const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';

console.log("📡 Attempting to connect to Telegram...");

const bot = new TelegramBot(token, { polling: true });

bot.getMe().then((me) => {
    console.log(`✅ CONNECTION SUCCESSFUL!`);
    console.log(`Bot Name: @${me.username}`);
    console.log(`Bot ID: ${me.id}`);
    console.log("------------------------------");
    console.log("Send a message to your bot in Telegram now.");
}).catch((err) => {
    console.error("❌ CONNECTION FAILED!");
    console.error("Error Code:", err.code);
    console.error("Message:", err.message);
    process.exit(1);
});

bot.on('message', (msg) => {
    console.log(`📩 Received message from ${msg.from.first_name}: "${msg.text}"`);
    bot.sendMessage(msg.chat.id, "Vanguard System: Received pulse. Connection 100% stable.");
});
