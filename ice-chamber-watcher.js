const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const { Connection, PublicKey } = require("@solana/web3.js");

const token = process.env.TELEGRAM_TOKEN;
const url = 'https://ice-alpha-2040-underground.onrender.com';
const mint = "5YwuwRWPz2Mru3kPvUYpT1u4f1KwwbeD1E3JrMpSY7KE"; 
const channelId = '-1003844332949';
const port = process.env.PORT || 10000;

if (!token) {
    console.error("FATAL ERROR: TELEGRAM_TOKEN is missing!");
    process.exit(1);
}

// Initialize bot with webhook on the Render port
const bot = new TelegramBot(token, {
    webHook: {
        port: port
    }
});

// Set the webhook URL on Telegram's side
bot.setWebHook(`${url}/bot${token}`)
    .then(() => console.log(`🧊 VANGUARD LIVE: Webhook set on port ${port}`))
    .catch(err => console.error("❌ Webhook Error:", err));

const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

// Response logic
bot.on('message', async (msg) => {
    if (msg.text === '/status' || msg.text === '/buy') {
        try {
            const balance = await connection.getBalance(architectWallet);
            const report = `🛰️ **ARCHITECT STATUS**\nTreasury: ${(balance/1e9).toFixed(4)} SOL\n[DASHBOARD](https://ice-alpha-2040-underground.vercel.app)`;
            bot.sendMessage(msg.chat.id, report, { parse_mode: 'Markdown' });
        } catch (e) { console.error("RPC Error:", e); }
    }
});

// Autopilot loop
cron.schedule('0 */2 * * *', async () => {
    try {
        const balance = await connection.getBalance(architectWallet);
        bot.sendMessage(channelId, `📡 **AUTO-SYNC**\nTreasury: ${(balance/1e9).toFixed(4)} SOL`);
    } catch (e) { console.error("Cron Error:", e); }
});

// Manual Health Check endpoint for Render (Optional but safe)
bot.onReplyToMessage((msg) => {}); // Just keeps the bot active
console.log("System initialized. Monitoring for incoming pulses...");
