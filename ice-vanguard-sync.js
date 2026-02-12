const { Connection, PublicKey } = require("@solana/web3.js");
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const connection = new Connection(process.env.RPC_URL, "confirmed");
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
const ARCHITECT = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

async function syncSystems() {
    console.log("====================================================");
    console.log("      🧊 ICE-ALPHA: WEAPON SYNC v2040       ");
    console.log("====================================================");

    // 1. Check Bot Link
    try {
        const me = await bot.getMe();
        console.log(`✅ VANGUARD BOT: ONLINE (@${me.username})`);
    } catch (e) {
        console.log("❌ VANGUARD BOT: DISCONNECTED (Check .env token)");
    }

    // 2. Check Blockchain Sync
    try {
        const bal = await connection.getBalance(ARCHITECT);
        console.log(`✅ SOLANA SYNC: ONLINE (${(bal/1e9).toFixed(4)} SOL)`);
    } catch (e) {
        console.log("❌ SOLANA SYNC: FAILED (Check RPC_URL)");
    }

    // 3. Check Channel Connection
    try {
        await bot.sendChatAction(process.env.TG_CHANNEL_ID, 'typing');
        console.log("✅ CHANNEL BYPASS: ACTIVE");
    } catch (e) {
        console.log("❌ CHANNEL BYPASS: FAILED (Bot must be Admin in Channel)");
    }

    console.log("----------------------------------------------------");
    console.log("📡 STATUS: ALL WEAPONS ARMED. AWAITING 0.014 SOL.");
    console.log("====================================================");
}

syncSystems();
