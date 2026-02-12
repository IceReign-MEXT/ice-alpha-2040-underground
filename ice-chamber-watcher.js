const { Connection, PublicKey } = require("@solana/web3.js");
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
// polling: true is what makes the bot "listen"
const bot = new TelegramBot(token, {polling: true});
const connection = new Connection(process.env.RPC_URL, "confirmed");
const ARCHITECT = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

console.log("🧊 SENTINEL & VANGUARD: ACTIVE AND LISTENING...");

// --- COMMAND LISTENER ---
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "🧊 **ICE-ALPHA VANGUARD ONLINE**\n\nI am watching the underground root. Send me /stats to see the bypass.");
});

bot.onText(/\/stats/, async (msg) => {
    const balance = await connection.getBalance(ARCHITECT);
    const sol = balance / 1e9;
    bot.sendMessage(msg.chat.id, `📊 **SYSTEM DATA:**\nBalance: ${sol.toFixed(4)} SOL\nBypass 2%: ${(sol * 0.02).toFixed(6)} SOL`);
});

// --- BLOCKCHAIN WATCHER ---
connection.onAccountChange(ARCHITECT, (info) => {
    const sol = info.lamports / 1e9;
    const msg = `🔥 **BYPASS ALERT!**\nNew Inflow detected. Architect balance updated: ${sol.toFixed(4)} SOL.`;
    bot.sendMessage(process.env.TG_CHANNEL_ID, msg, { parse_mode: 'Markdown' });
}, "confirmed");

// Error handling to prevent silent crashes
bot.on("polling_error", (err) => console.log("🤖 Bot Error:", err.message));
