const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const { Connection, PublicKey } = require("@solana/web3.js");

// Heartbeat for Render
http.createServer((req, res) => { res.write("Vanguard Active"); res.end(); }).listen(process.env.PORT || 10000);

const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';
const channelId = '-1003844332949';
const bot = new TelegramBot(token, {polling: true});
const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

const memes = [
    "Me watching the 0.014 SOL target like it's the last bus out of the Matrix. 🧊",
    "Fiat is just a bad joke, and $ICE is the punchline. ❄️",
    "They said I'm early. I told them I'm the Architect. 🏗️",
    "The 4% loop isn't a glitch. It's the design. 🌀"
];

// --- AUTOPILOT JOBS ---

// 1. Every 6 Hours: The "Underground Daily" Newspaper & Balance Proof
cron.schedule('0 */6 * * *', async () => {
    try {
        const balance = await connection.getBalance(architectWallet);
        const sol = balance / 1e9;
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        
        const report = `🗞️ **THE UNDERGROUND DAILY** 🗞️\n\n` +
                       `**HEADLINE:** ARCHITECT STATUS REPORT\n` +
                       `--------------------------------\n` +
                       `• **Current Balance:** ${sol.toFixed(4)} SOL\n` +
                       `• **Target:** 0.014 SOL\n` +
                       `• **Vibe Check:** ${randomMeme}\n\n` +
                       `*Automated by Vanguard 2040. Stay cold.*`;
        
        bot.sendMessage(channelId, report, { parse_mode: 'Markdown' });
        console.log("📡 Autopilot: Newspaper delivered.");
    } catch (err) {
        console.error("Autopilot Error:", err);
    }
});

console.log("🧊 VANGUARD AUTOPILOT: ONLINE");

// Commands
bot.onText(/\/status/, (msg) => {
    bot.sendMessage(msg.chat.id, "✅ Vanguard System: Active 24/7 on Autopilot.");
});

// Real-time Watcher (Instant alert if balance moves)
connection.onAccountChange(architectWallet, (info) => {
    const sol = info.lamports / 1e9;
    bot.sendMessage(channelId, `⚠️ **LIVE INTEL:** Wallet balance changed to ${sol.toFixed(4)} SOL.`);
}, "confirmed");
