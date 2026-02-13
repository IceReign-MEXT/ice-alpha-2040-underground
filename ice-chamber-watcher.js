const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const { Connection, PublicKey } = require("@solana/web3.js");

const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';
const channelId = '-1003844332949';
const url = 'https://ice-alpha-2040-underground.onrender.com';
const mint = "5YwuwRWPz2Mru3kPvUYpT1u4f1KwwbeD1E3JrMpSY7KE"; 
const port = process.env.PORT || 10000;

const bot = new TelegramBot(token, { webHook: { port: port } });
bot.setWebHook(`${url}/bot${token}`);

const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

bot.on('message', async (msg) => {
    if (msg.text === '/buy' || msg.text === '/newspaper' || msg.text === '/status') {
        const balance = await connection.getBalance(architectWallet);
        bot.sendMessage(msg.chat.id, `🗞️ **DAILY REPORT**\n\nTreasury: ${(balance/1e9).toFixed(4)} SOL\n\n🚀 [BUY $ICE](https://jup.ag/swap/SOL-${mint})`, { parse_mode: 'Markdown' });
    }
});

cron.schedule('0 */2 * * *', async () => {
    const balance = await connection.getBalance(architectWallet);
    bot.sendMessage(channelId, `📡 **AUTO-SYNC:** Loop Active. Treasury at ${(balance/1e9).toFixed(4)} SOL.`);
});
