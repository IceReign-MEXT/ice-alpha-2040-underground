const TelegramBot = require('node-telegram-bot-api');
const { Connection, PublicKey } = require("@solana/web3.js");
require('dotenv').config();

// --- HARDCODED BYPASS ---
const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';
const channelId = '-1003844332949'; 
// ------------------------

const bot = new TelegramBot(token, {polling: true});
const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");

console.log("🧊 ICE-CHAMBER WATCHER: ONLINE");

bot.on('message', (msg) => {
    if (msg.text === '/status') {
        bot.sendMessage(msg.chat.id, "✅ Vanguard System 2040: Active and Monitoring the Root.");
    }
});

// Watch the Architect's wallet
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

connection.onAccountChange(architectWallet, (info) => {
    const sol = info.lamports / 1e9;
    bot.sendMessage(channelId, `📡 **WALLET UPDATE:** Architect balance is now ${sol.toFixed(4)} SOL.`);
    if (sol >= 0.014) {
        bot.sendMessage(channelId, "🔥 **THRESHOLD REACHED:** 0.014 SOL Detected. Metadata Forge is ready for activation.");
    }
}, "confirmed");
