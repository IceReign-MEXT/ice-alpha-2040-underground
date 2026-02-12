const { Connection, Keypair, SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } = require("@solana/web3.js");
require('dotenv').config();

// Custom Base58 Decoder for Termux/Node Compatibility
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const decodeBase58 = (str) => {
    let result = BigInt(0);
    for (const char of str) {
        const index = ALPHABET.indexOf(char);
        if (index === -1) continue;
        result = result * BigInt(58) + BigInt(index);
    }
    let bytes = [];
    while (result > 0n) {
        bytes.unshift(Number(result % 256n));
        result = result / 256n;
    }
    for (let i = 0; i < str.length && str[i] === '1'; i++) bytes.unshift(0);
    return new Uint8Array(bytes);
};

async function sweep() {
    const connection = new Connection(process.env.RPC_URL, "confirmed");
    const mainArchitect = new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf");

    let fromWallet;
    try {
        const rawKey = process.env.PRIVATE_KEY.trim();
        const decoded = decodeBase58(rawKey);
        // Handle both 32-byte seeds and 64-byte full keys
        fromWallet = decoded.length === 32 ? Keypair.fromSeed(decoded) : Keypair.fromSecretKey(decoded);
    } catch (e) {
        return console.log("❌ KEY ERROR: Check your .env file.");
    }

    // Skip if we are already in the main wallet
    if (fromWallet.publicKey.toBase58() === mainArchitect.toBase58()) {
        return console.log("🧊 You are currently logged into the Main Architect wallet. No need to sweep itself!");
    }

    const balance = await connection.getBalance(fromWallet.publicKey);
    console.log(`📡 Wallet ${fromWallet.publicKey.toBase58()} has ${balance / LAMPORTS_PER_SOL} SOL.`);

    if (balance < 10000) {
        return console.log("❌ Balance too low to cover the network fee.");
    }

    const amountToSend = balance - 5000; // Leave tiny bit for gas
    const tx = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: fromWallet.publicKey,
            toPubkey: mainArchitect,
            lamports: amountToSend,
        })
    );

    try {
        const sig = await connection.sendTransaction(tx, [fromWallet]);
        console.log(`✅ SWEEP SUCCESS! Moved ${amountToSend / LAMPORTS_PER_SOL} SOL to Architect.`);
        console.log(`📜 TX: ${sig}`);
    } catch (err) {
        console.error("❌ SWEEP FAILED:", err.message);
    }
}

sweep();

