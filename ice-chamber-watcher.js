const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const { Connection, PublicKey } = require("@solana/web3.js");

// Heartbeat for Render
http.createServer((req, res) => { res.write("Vanguard Active"); res.end(); }).listen(process.env.PORT || 10000);

const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';
const channelId = '-1003844332949';
const dashboardUrl = 'https://ice-alpha-2040-underground.vercel.app';
const bot = new TelegramBot(token, {polling: true});
const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

console.log("🧊 VANGUARD AUTOPILOT: ONLINE");

// 1. AUTOMATIC WELCOME (When anyone joins the group)
bot.on('message', (msg) => {
    if (msg.new_chat_members) {
        msg.new_chat_members.forEach((user) => {
            const welcomeMsg = `❄️ **WELCOME TO THE ICE-CHAMBER, ${user.first_name}!**\n\n` +
                               `You have entered the 2040 Underground Loop. Monitor our progress and the Architect's wallet here:\n\n` +
                               `🔗 **LIVE DASHBOARD:** ${dashboardUrl}\n\n` +
                               `*The Forge is warming up.*`;
            bot.sendMessage(msg.chat.id, welcomeMsg, { parse_mode: 'Markdown' });
        });
    }
});

// 2. AUTOMATIC NEWSPAPER (Every 6 Hours)
cron.schedule('0 */6 * * *', async () => {
    try {
        const balance = await connection.getBalance(architectWallet);
        const sol = balance / 1e9;
        
        const report = `🗞️ **THE UNDERGROUND DAILY** 🗞️\n\n` +
                       `**HEADLINE:** ARCHITECT SOL BALANCE VERIFIED\n` +
                       `--------------------------------\n` +
                       `• **Current Proof:** ${sol.toFixed(4)} SOL\n` +
                       `• **Target:** 0.014 SOL\n` +
                       `• **Live Data:** [View Dashboard](${dashboardUrl})\n\n` +
                       `*This is an automated blockchain verification.*`;
        
        bot.sendMessage(channelId, report, { parse_mode: 'Markdown', disable_web_page_preview: true });
    } catch (err) {
        console.error("Autopilot News Error:", err);
    }
});

// 3. INSTANT WALLET ALERTS
connection.onAccountChange(architectWallet, (info) => {
    const sol = info.lamports / 1e9;
    bot.sendMessage(channelId, `⚠️ **LIVE INTEL:** Wallet Activity! Balance: ${sol.toFixed(4)} SOL.`);
}, "confirmed");

// Manual Status Command
bot.onText(/\/status/, (msg) => {
    bot.sendMessage(msg.chat.id, "✅ Vanguard System: 24/7 Autopilot Engaged.");
});
