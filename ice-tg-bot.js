const TelegramBot = require('node-telegram-bot-api');
const { Connection, PublicKey } = require("@solana/web3.js");
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});
const connection = new Connection(process.env.RPC_URL, "confirmed");

const ARCHITECT = "3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf";
const CHATS = {
    CHANNEL: process.env.TG_CHANNEL_ID,
    PUBLIC: process.env.TG_PUBLIC_GROUP_ID,
    ELITE: process.env.TG_PRIVATE_ELITE_ID
};

// --- INITIALIZE WEAPON ---
console.log("🧊 ICE-ALPHA VANGUARD: CONNECTED TO ALL TERMINALS");

// --- BROADCAST FUNCTION ---
async function broadcastUpdate(message, terminal = "PUBLIC") {
    try {
        await bot.sendMessage(CHATS[terminal], message, { parse_mode: 'Markdown' });
    } catch (e) {
        console.error(`❌ Terminal ${terminal} unreachable:`, e.message);
    }
}

// --- COMMANDS ---
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "🧊 **VANGUARD SYSTEM ACTIVE**\nSelect your access level below.", {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🧬 BUY $ICE', callback_data: 'buy' }],
                [{ text: '📊 SYSTEM REVENUE', callback_data: 'rev' }]
            ]
        }
    });
});

bot.on('callback_query', async (query) => {
    const chat = query.message.chat.id;
    if (query.data === 'rev') {
        const bal = await connection.getBalance(new PublicKey(ARCHITECT));
        const sol = (bal / 1e9).toFixed(4);
        const bypass = (sol * 0.02).toFixed(6);
        bot.sendMessage(chat, `📡 **BYPASS ROOT 2040:**\nBalance: ${sol} SOL\nBypass 2%: ${bypass} SOL (Secret Active)`);
    }
    if (query.data === 'buy') {
        bot.sendMessage(chat, `🎯 **INFILTRATION ADDR:**\nSend SOL to: \`${ARCHITECT}\`\n4% Data loop will auto-transfer tokens.`);
    }
});

// Auto-Post to Channel every hour to keep it busy
setInterval(() => {
    broadcastUpdate("❄️ **BYPASS STATUS:** 2040 Logic running stable. Underground roots expanding.", "CHANNEL");
}, 3600000);
