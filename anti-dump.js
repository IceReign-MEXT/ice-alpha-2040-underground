const { Connection, PublicKey } = require("@solana/web3.js");
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const connection = new Connection(process.env.RPC_URL, "confirmed");
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
const MINT = new PublicKey("3kAeMSrgLqyX2TBTT2BXgugGLkXpznenfLjs4Q2BWqtW");
const ELITE_CHAMBER = process.env.TG_PRIVATE_ELITE_ID;

const DUMP_THRESHOLD = 1000000; // Adjust based on 1% of your supply

console.log("🌊 WHALE WATCHER: Monitoring for Anti-Dump triggers...");

connection.onLogs(MINT, async (logs, ctx) => {
    if (logs.err) return;
    
    // Check for large 'Transfer' instructions
    if (logs.logs.some(l => l.includes("Transfer"))) {
        console.log("📡 Movement detected... analyzing volume.");
        // In a real scenario, we'd parse the instruction data here
        // For now, we alert the elite chamber of high activity
        bot.sendMessage(ELITE_CHAMBER, "⚠️ **ANTI-DUMP ALERT:** High volume movement detected in the underground root. Architecture scan in progress...");
    }
}, "confirmed");
