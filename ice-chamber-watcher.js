const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const { Connection, PublicKey } = require("@solana/web3.js");

const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';
const url = 'https://ice-alpha-2040-underground.onrender.com';
const mint = "5YwuwRWPz2Mru3kPvUYpT1u4f1KwwbeD1E3JrMpSY7KE"; 
const port = process.env.PORT || 10000;

const bot = new TelegramBot(token, { webHook: { port: port } });
bot.setWebHook(`${url}/bot${token}`);

const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

bot.on('message', async (msg) => {
    if (msg.text === '/buy' || msg.text === '/newspaper') {
        const balance = await connection.getBalance(architectWallet);
        const report = `🗞️ **UNDERGROUND INTEL**\n\n` +
                       `🏦 **TREASURY:** ${(balance/1e9).toFixed(4)} SOL\n` +
                       `💎 **OFFICIAL $ICE:** Verified\n\n` +
                       `⚠️ *Ignore all old/rugged tokens. This is the only official forge.*\n\n` +
                       `🚀 [BUY ON JUPITER](https://jup.ag/swap/SOL-${mint})`;
        bot.sendMessage(msg.chat.id, report, { parse_mode: 'Markdown' });
    }
});
