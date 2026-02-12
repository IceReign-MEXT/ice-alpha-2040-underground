const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const { Connection, PublicKey } = require("@solana/web3.js");

http.createServer((req, res) => { res.write("Vanguard Active"); res.end(); }).listen(process.env.PORT || 10000);

const token = '8411660040:AAGCo3vLM0gNvm1CZMTXhc23Q0IbxgNaiNA';
const channelId = '-1003844332949';
const bot = new TelegramBot(token, {polling: true});
const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d");

const memes = [
    "Me watching the 0.014 SOL target like it's the last bus out of the Matrix. 🧊",
    "Fiat is just a bad joke, and $ICE is the punchline. ❄️",
    "They said I'm early. I told them I'm the Architect. 🏗️",
    "My wife asked why I'm staring at the Solana chart. I told her I'm building a school. 🏫",
    "0.014 SOL detected? That's not a balance, that's a revolution. 🔥"
];

const quotes = [
    "Few understand. Most will regret. Join the loop. ♾️",
    "The 4% loop isn't a glitch. It's the design. 🌀",
    "We don't buy the dip. We build the future. 🧱"
];

console.log("🧊 VANGUARD PROPAGANDA SYSTEM: ONLINE");

// Command: Status
bot.onText(/\/status/, (msg) => {
    bot.sendMessage(msg.chat.id, "✅ **VANGUARD SYSTEM 2040**\n📡 Mainnet: Connected\n🔒 2% Bypass: Locked\n❄️ $ICE Level: Absolute Zero");
});

// Command: Meme
bot.onText(/\/meme/, (msg) => {
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    bot.sendMessage(msg.chat.id, `🤡 **ARCHITECT HUMOR:**\n\n"${randomMeme}"`);
});

// Command: Newspaper (The Underground Daily)
bot.onText(/\/newspaper/, (msg) => {
    const balanceMsg = "🗞️ **THE UNDERGROUND DAILY** 🗞️\n\n" +
          "**HEADLINE:** ARCHITECT NEARS 0.014 SOL THRESHOLD\n" +
          "--------------------------------\n" +
          "• **Market Sentiment:** Bullish on Ice\n" +
          "• **Supply Status:** 4% Loop Active\n" +
          "• **Quote of the Day:** " + quotes[Math.floor(Math.random() * quotes.length)] + "\n\n" +
          "*Stay cold. Stay focused.*";
    bot.sendMessage(msg.chat.id, balanceMsg, { parse_mode: 'Markdown' });
});

// Wallet Watcher (Sends to Channel)
const architectWallet = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");
connection.onAccountChange(architectWallet, (info) => {
    const sol = info.lamports / 1e9;
    bot.sendMessage(channelId, `⚠️ **INTEL ALERT:** Wallet activity detected!\n🏦 Current Balance: ${sol.toFixed(4)} SOL\n\n"The Architect is moving. Are you?"`);
}, "confirmed");
