const { Connection, Keypair, PublicKey } = require("@solana/web3.js");
const { createMint, getOrCreateAssociatedTokenAccount, mintTo } = require("@solana/spl-token");
const bs58 = require("bs58");
require('dotenv').config();

async function forgeIceAlpha() {
    const connection = new Connection(process.env.RPC_URL, "confirmed");

    // --- ROBUST KEY DECODING BLOCK ---
    let secretKey;
    const rawKey = (process.env.PRIVATE_KEY || "").trim();

    try {
        // Attempt 1: Default import, Attempt 2: .default property (CommonJS fix)
        const decoder = bs58.decode ? bs58 : bs58.default;

        if (rawKey.startsWith('[')) {
            secretKey = Uint8Array.from(JSON.parse(rawKey));
        } else {
            secretKey = Uint8Array.from(decoder.decode(rawKey));
        }
    } catch (e) {
        console.error("❌ ARCHITECT ERROR: Private key decoding failed.");
        console.log("Check if your .env has PRIVATE_KEY=YourKeyWithoutQuotes");
        return;
    }

    const architect = Keypair.fromSecretKey(secretKey);
    console.log(`🔨 FORGE INITIALIZED: ${architect.publicKey.toBase58()}`);

    try {
        // 1. CREATE MINT
        console.log("✨ Forging Token Mint (approx 0.02 SOL cost)...");
        const mint = await createMint(
            connection,
            architect,           // Payer
            architect.publicKey, // Mint Authority
            architect.publicKey, // Freeze Authority
            9                    // 9 Decimals
        );
        console.log(`📍 MINT ADDRESS: ${mint.toBase58()}`);

        // 2. CREATE VAULT
        console.log("📦 Opening Architect's Vault (ATA)...");
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            architect,
            mint,
            architect.publicKey
        );

        // 3. MINT SUPPLY (1 Billion)
        const supply = 1_000_000_000n * 1_000_000_000n; // Use BigInt for 10^9 decimals
        console.log("🔥 Minting 1,000,000,000 Tokens...");

        const mintSig = await mintTo(
            connection,
            architect,
            mint,
            tokenAccount.address,
            architect,
            supply
        );

        console.log("------------------------------------");
        console.log("🚀 ICEALPHA FORGED SUCCESSFULLY!");
        console.log(`📜 SIGNATURE: ${mintSig}`);
        console.log(`🔗 MINT: ${mint.toBase58()}`);
        console.log("------------------------------------");

    } catch (error) {
        console.error("❌ FORGE FAILED:", error.message);
    }
}

forgeIceAlpha();

