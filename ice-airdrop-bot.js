const TelegramBot = require('node-telegram-bot-api');
const { Connection, PublicKey, Keypair, Transaction } = require("@solana/web3.js");
const { getOrCreateAssociatedTokenAccount, createTransferInstruction } = require("@solana/spl-token");
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});
const connection = new Connection(process.env.RPC_URL, "confirmed");

// Load the Architect's key
const secretKey = Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY_JSON || "[]"));
const architect = Keypair.fromSecretKey(secretKey);
const MINT = new PublicKey("3kAeMSrgLqyX2TBTT2BXgugGLkXpznenfLjs4Q2BWqtW");

console.log("🧬 AIRDROP SYSTEM: ONLINE - Waiting for addresses...");

bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    // Detect Solana address pattern
    if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(text)) {
        try {
            bot.sendMessage(chatId, "🧊 *Address Detected.* Verifying underground status...", {parse_mode: 'Markdown'});
            
            const recipient = new PublicKey(text);
            const fromAta = await getOrCreateAssociatedTokenAccount(connection, architect, MINT, architect.publicKey);
            const toAta = await getOrCreateAssociatedTokenAccount(connection, architect, MINT, recipient);

            const tx = new Transaction().add(
                createTransferInstruction(fromAta.address, toAta.address, architect.publicKey, 1000000) // Sends 1 $ICE (adjust decimals)
            );

            const signature = await connection.sendTransaction(tx, [architect]);
            bot.sendMessage(chatId, `✅ *Airdrop Sent!* \nLogic deployed to: \`${text}\` \nSig: [View](https://solscan.io/tx/${signature})`, {parse_mode: 'Markdown'});
        } catch (e) {
            console.error(e);
            bot.sendMessage(chatId, "❌ *Bypass Failed.* Ensure you have enough SOL for gas.");
        }
    }
});
