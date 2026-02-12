const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});
const PRIVATE_CHAMBER = process.env.TG_PRIVATE_ELITE_ID;
const PUBLIC_GROUP = process.env.TG_PUBLIC_GROUP_ID;
const CHANNEL = process.env.TG_CHANNEL_ID;

console.log("🏹 RAID LEADER: STANDING BY FOR COMMANDS...");

bot.onText(/\/raid (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const raidLink = match[1]; // The link you want them to raid (X/DexScreener)

    // Security: Only allow the Architect in the Private Chamber to trigger raids
    if (chatId.toString() === PRIVATE_CHAMBER.toString()) {
        const raidMessage = `🔥 **UNDERGROUND RAID INITIATED!** 🔥\n\n` +
                            `🧬 The Architect has spoken. Focus all fire here:\n` +
                            `👉 ${raidLink}\n\n` +
                            `❄️ **STAY COLD. STAY MOBILE. NO PRISONERS.**`;

        // Blast to Public Group
        bot.sendMessage(PUBLIC_GROUP, raidMessage, { parse_mode: 'Markdown' });
        // Blast to Channel
        bot.sendMessage(CHANNEL, raidMessage, { parse_mode: 'Markdown' });
        
        bot.sendMessage(PRIVATE_CHAMBER, "✅ **RAID SIGNAL SENT TO THE MASSES.**");
    } else {
        bot.sendMessage(chatId, "❌ **UNAUTHORIZED.** Only the Architect can trigger a raid.");
    }
});
