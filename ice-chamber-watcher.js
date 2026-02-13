const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const http = require('http');
const { Connection, PublicKey } = require("@solana/web3.js");

const token = process.env.TELEGRAM_TOKEN;
const mint = "5YwuwRWPz2Mru3kPvUYpT1u4f1KwwbeD1E3JrMpSY7KE"; 
const channelId = '-1003844332949';
const port = process.env.PORT || 10000;

const bot = new TelegramBot(token, { polling: true });

// Render Health Check Server
http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Vanguard System Online");
}).listen(port);

const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

bot.on('message', async (msg) => {
    if (msg.text === '/status' || msg.text === '/buy') {
        const balance = await connection.getBalance(architectWallet);
        bot.sendMessage(msg.chat.id, `🛰️ **ARCHITECT STATUS**\nTreasury: ${(balance/1e9).toFixed(4)} SOL\n[DASHBOARD](https://ice-alpha-2040-underground.vercel.app)`, { parse_mode: 'Markdown' });
    }
});

cron.schedule('0 */2 * * *', async () => {
    const balance = await connection.getBalance(architectWallet);
    bot.sendMessage(channelId, `📡 **AUTO-SYNC**\nTreasury: ${(balance/1e9).toFixed(4)} SOL`);
});

console.log("🧊 VANGUARD LIVE: Polling Mode Active");
