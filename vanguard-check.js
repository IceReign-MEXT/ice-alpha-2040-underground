const { Connection } = require("@solana/web3.js");
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

async function runDiagnostic() {
    console.log("🔍 RUNNING SYSTEM DIAGNOSTIC...");

    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
        console.log("❌ ERROR: TELEGRAM_BOT_TOKEN is undefined in .env");
        return;
    }

    console.log(`📡 PROBING TOKEN: ${token.substring(0, 4)}...${token.substring(token.length - 4)} (Length: ${token.length})`);

    // 1. Test Solana RPC
    try {
        const conn = new Connection(process.env.RPC_URL);
        const version = await conn.getVersion();
        console.log("✅ SOLANA RPC: CONNECTED (Version: " + version['solana-core'] + ")");
    } catch (e) { console.log("❌ SOLANA RPC: FAILED - " + e.message); }

    // 2. Test Telegram Bot
    try {
        const bot = new TelegramBot(token);
        const me = await bot.getMe();
        console.log(`✅ TELEGRAM BOT: CONNECTED (@${me.username})`);
    } catch (e) { 
        console.log(`❌ TELEGRAM BOT: FAILED (Code: ${e.code || 'Unknown'})`);
        if (e.message.includes('404')) {
            console.log("💡 HINT: The library is building an invalid URL. Ensure no 'bot' prefix is in the .env value.");
        }
    }
}

runDiagnostic();
