const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const { Connection, PublicKey } = require("@solana/web3.js");

// Keep-Alive Server for Render/Uptime Robot
http.createServer((req, res) => {
  res.write("Vanguard System 2040: Active");
  res.end();
}).listen(process.env.PORT || 10000);

// Hardcoded Bypass for Render Stability
const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';
const channelId = '-1003844332949';

const bot = new TelegramBot(token, {polling: true});
const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");

console.log("🧊 ICE-CHAMBER WATCHER: ONLINE & HEARTBEAT ACTIVE");

bot.on('message', (msg) => {
    if (msg.text === '/status') {
        bot.sendMessage(msg.chat.id, "✅ Vanguard System: Active 24/7 on Render.");
    }
});

const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");
connection.onAccountChange(architectWallet, (info) => {
    const sol = info.lamports / 1e9;
    bot.sendMessage(channelId, `📡 **WALLET UPDATE:** Architect balance: ${sol.toFixed(4)} SOL.`);
}, "confirmed");
