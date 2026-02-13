const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const { Connection, PublicKey } = require("@solana/web3.js");

// SAFE: We use process.env instead of the real token
const token = process.env.TELEGRAM_TOKEN;
const channelId = '-1003844332949';
const url = 'https://ice-alpha-2040-underground.onrender.com';
const mint = "5YwuwRWPz2Mru3kPvUYpT1u4f1KwwbeD1E3JrMpSY7KE"; 
const port = process.env.PORT || 10000;

if (!token) {
    console.error("FATAL ERROR: TELEGRAM_TOKEN is not set in Environment Variables!");
    process.exit(1);
}

const bot = new TelegramBot(token, { webHook: { port: port } });
bot.setWebHook(`${url}/bot${token}`);

// ... rest of your code remains the same ...
