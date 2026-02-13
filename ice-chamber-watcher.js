const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const http = require('http');
const { Connection, PublicKey } = require("@solana/web3.js");

const token = process.env.TELEGRAM_TOKEN;
const channelId = '-1003844332949';
const port = process.env.PORT || 10000;

const bot = new TelegramBot(token, { polling: true });

// PROFESSIONAL AGENT DIALOGUE
const gatekeeperReplies = [
  "Protocol secure. The Architect is observing.",
  "You're accessing the 2040 Bypass. Stay focused.",
  "Data stream verified. The Forge is heating up.",
  "Vanguard status: Active. Do not blink."
];

const transmissions = [
  "📡 SIGNAL: 2040 bypass logic is holding. Resistance is building.",
  "🧊 SYSTEM: Treasury verified at 4%. The Architects forge never sleeps.",
  "🔓 TRANSMISSION: The school is accepting the first Vanguard initiates."
];

http.createServer((req, res) => { res.writeHead(200); res.end("Vanguard System Online"); }).listen(port);

const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

bot.on('message', async (msg) => {
    if (msg.text === '/status') {
        const balance = await connection.getBalance(architectWallet);
        bot.sendMessage(msg.chat.id, `🛰️ **ARCHITECT INTERFACE v3.1**\n\nTreasury: ${(balance/1e9).toFixed(4)} SOL\nProtocol: Secure\n\n[DASHBOARD](https://ice-alpha-2040-underground.vercel.app)`, { parse_mode: 'Markdown' });
    }
    if (msg.text === '/roast') {
        bot.sendMessage(msg.chat.id, `🧊 **GATEKEEPER:** "${gatekeeperReplies[Math.floor(Math.random() * gatekeeperReplies.length)]}"`);
    }
});

// Autopilot every 2 hours
cron.schedule('0 */2 * * *', async () => {
    const balance = await connection.getBalance(architectWallet);
    const line = transmissions[Math.floor(Math.random() * transmissions.length)];
    bot.sendMessage(channelId, `📡 **[INCOMING TRANSMISSION]**\n\n"${line}"\n\nTreasury: ${(balance/1e9).toFixed(4)} SOL\n[FORGE](https://ice-alpha-2040-underground.vercel.app)`);
});

console.log("Vanguard v3.1: Professional Agent Logic Active.");
