const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const { Connection, PublicKey } = require("@solana/web3.js");

// Heartbeat for Render
http.createServer((req, res) => { res.write("Vanguard Active"); res.end(); }).listen(process.env.PORT || 10000);

const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';
const channelId = '-1003844332949';
const bot = new TelegramBot(token, {polling: true});
const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");

console.log("🧊 ICE-CHAMBER WATCHER: ONLINE");

// Command: Status (Works in Private AND Channels)
bot.onText(/\/status/, (msg) => {
    bot.sendMessage(msg.chat.id, "✅ Vanguard System 2040: Monitoring Solana Mainnet.\n📡 Status: Active\n🔒 Security: Bypass 2.0 Engaged");
});

// Notify Channel when someone joins (Optional/Cool)
bot.on('chat_member', (update) => {
    if (update.new_chat_member.status === 'member') {
        bot.sendMessage(channelId, "👤 **NEW RECRUIT:** A student has entered the Ice-Chamber.");
    }
});

// Wallet Watcher
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");
connection.onAccountChange(architectWallet, (info) => {
    const sol = info.lamports / 1e9;
    bot.sendMessage(channelId, `⚠️ **INTEL:** Wallet Activity Detected. Current Balance: ${sol.toFixed(4)} SOL.`);
}, "confirmed");
