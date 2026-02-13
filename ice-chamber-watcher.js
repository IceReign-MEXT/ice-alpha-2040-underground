const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const { Connection, PublicKey } = require("@solana/web3.js");

const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';
const url = 'https://ice-alpha-2040-underground.onrender.com';
const mint = "5YwuwRWPz2Mru3kPvUYpT1u4f1KwwbeD1E3JrMpSY7KE"; // THE NEW SAFE TOKEN
const port = process.env.PORT || 10000;

const bot = new TelegramBot(token, { webHook: { port: port } });
bot.setWebHook(`${url}/bot${token}`);

const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

bot.on('message', async (msg) => {
    if (msg.text === '/status' || msg.text === '/buy') {
        const balance = await connection.getBalance(architectWallet);
        bot.sendMessage(msg.chat.id, `✅ **VANGUARD SECURE**\n\nTreasury: ${(balance/1e9).toFixed(4)} SOL\nToken: $ICE (Verified)\n\n🚀 [BUY ON JUPITER](https://jup.ag/swap/SOL-${mint})`, { parse_mode: 'Markdown' });
    }
});
