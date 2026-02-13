const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const { Connection, PublicKey } = require("@solana/web3.js");

const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';
const channelId = '-1003844332949';
const url = 'https://ice-alpha-2040-underground.onrender.com';
const port = process.env.PORT || 10000;

const bot = new TelegramBot(token, { webHook: { port: port } });
bot.setWebHook(`${url}/bot${token}`);

const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

// NEW: This handles the manual commands when using Webhooks
bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/status') bot.sendMessage(chatId, "✅ Vanguard System: Online (24/7 Autopilot)");
    
    if (text === '/newspaper' || text === '/buy') {
        const balance = await connection.getBalance(architectWallet);
        const sol = balance / 1e9;
        const buyLink = `https://raydium.io/swap/?inputCurrency=sol&outputCurrency=YOUR_TOKEN_MINT_HERE`;
        
        const report = `🗞️ **THE UNDERGROUND DAILY**\n\n` +
                       `🏦 **TREASURY:** ${sol.toFixed(4)} SOL\n` +
                       `🎯 **TARGET:** 0.014 SOL\n\n` +
                       `💸 **DIRECT BUY:** [Swap on Raydium](${buyLink})\n` +
                       `📊 **DASHBOARD:** [Live Forge](https://ice-alpha-2040-underground.vercel.app)`;
        
        bot.sendMessage(chatId, report, { parse_mode: 'Markdown' });
    }
});

// Autopilot: Post every 2 hours
cron.schedule('0 */2 * * *', () => {
    bot.sendMessage(channelId, "📡 **SYSTEM UPDATE:** 2-hour loop complete. Dashboard synced. Check /newspaper for proof.");
});

console.log("🧊 VANGUARD v2.0: WEBHOOK + MANUAL FIXED");
