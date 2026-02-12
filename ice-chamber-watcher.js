const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const { Connection, PublicKey } = require("@solana/web3.js");

const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';
const channelId = '-1003844332949';
const url = 'https://ice-alpha-2040-underground.onrender.com'; 
const port = process.env.PORT || 10000;

// Initialize Bot with Webhook for Render stability
const bot = new TelegramBot(token, { webHook: { port: port } });
bot.setWebHook(`${url}/bot${token}`);

const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

console.log("🧊 VANGUARD WEBHOOK SYSTEM: ONLINE");

// 6-Hour Automated Proof
cron.schedule('0 */6 * * *', async () => {
    try {
        const balance = await connection.getBalance(architectWallet);
        const sol = balance / 1e9;
        bot.sendMessage(channelId, `🗞️ **DAILY PROOF:** Architect Balance is ${sol.toFixed(4)} SOL. The Forge is active. ❄️`);
    } catch (e) { console.error(e); }
});

// Response Logic
bot.on('message', (msg) => {
    if (msg.text === '/status') bot.sendMessage(msg.chat.id, "✅ Vanguard Active via Webhook.");
    if (msg.text === '/dashboard') bot.sendMessage(msg.chat.id, "🔗 **LIVE FORGE:** https://ice-alpha-2040-underground.vercel.app");
});

// Wallet Watcher
connection.onAccountChange(architectWallet, (info) => {
    const sol = info.lamports / 1e9;
    bot.sendMessage(channelId, `⚠️ **LIVE INTEL:** Wallet balance changed to ${sol.toFixed(4)} SOL.`);
}, "confirmed");
