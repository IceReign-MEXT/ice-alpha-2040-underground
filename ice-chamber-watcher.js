const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const http = require('http');
const { Connection, PublicKey } = require("@solana/web3.js");

const token = process.env.TELEGRAM_TOKEN;
const channelId = '-1003844332949';
const port = process.env.PORT || 10000;

const bot = new TelegramBot(token, { polling: true });

// AI PERSONALITY DATA
const proRoasts = [
  "Portfolio status: Hibernation mode detected. Move or freeze.",
  "You're chasing candles in 2026. I'm building the grid for 2040. We are not the same.",
  "Warning: Low-conviction detected. Please exit the forge before you melt.",
  "The Architect doesn't recognize your signature. Re-verify or stay rugged."
];

const transmissions = [
  "📡 Signal: The Bypass is 4% complete. Architecture is holding.",
  "🧊 System: 0.014 SOL Target remains. The Underground is watching.",
  "🔓 Logic: Code is Law. The Forge is the only escape from the Freeze."
];

// Health Check
http.createServer((req, res) => { res.writeHead(200); res.end("Vanguard Live"); }).listen(port);

const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

bot.on('message', async (msg) => {
    if (msg.text === '/status') {
        const balance = await connection.getBalance(architectWallet);
        const sol = (balance/1e9).toFixed(4);
        bot.sendMessage(msg.chat.id, `🛰️ **VANGUARD CORE STATE**\n\nTreasury: ${sol} SOL\nProtocol: Active\n\n[DASHBOARD](https://ice-alpha-2040-underground.vercel.app)`, { parse_mode: 'Markdown' });
    }
    if (msg.text === '/roast') {
        bot.sendMessage(msg.chat.id, `🧊 **AGENT 2040:** "${proRoasts[Math.floor(Math.random() * proRoasts.length)]}"`);
    }
});

// Autopilot: Every 2 Hours
cron.schedule('0 */2 * * *', async () => {
    const balance = await connection.getBalance(architectWallet);
    const text = transmissions[Math.floor(Math.random() * transmissions.length)];
    bot.sendMessage(channelId, `📡 **[SYSTEM TRANSMISSION]**\n\n"${text}"\n\nTreasury: ${(balance/1e9).toFixed(4)} SOL\n[ACCESS FORGE](https://ice-alpha-2040-underground.vercel.app)`);
});

console.log("Vanguard v3.0: High-Level Autopilot Engaged.");
