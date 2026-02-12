const {
    Connection,
    PublicKey,
    Keypair,
    Transaction
} = require("@solana/web3.js");
const {
    createBurnInstruction,
    getOrCreateAssociatedTokenAccount
} = require("@solana/spl-token");
const bs58 = require("bs58");
require('dotenv').config();

async function burnTokens(tokenMintAddress, amount) {
    const connection = new Connection(process.env.RPC_URL, 'confirmed');

    // Load the Architect's Key
    const secretKey = bs58.decode(process.env.PRIVATE_KEY);
    const wallet = Keypair.fromSecretKey(secretKey);

    console.log(`🔥 INITIATING BURN SEQUENCE FOR: ${tokenMintAddress}`);

    try {
        const mintPublicKey = new PublicKey(tokenMintAddress);

        // 1. Find the token account holding your tokens
        const account = await getOrCreateAssociatedTokenAccount(
            connection,
            wallet,
            mintPublicKey,
            wallet.publicKey
        );

        // 2. Create the Burn Instruction
        // Amount must be multiplied by 10^decimals (e.g., for 9 decimals, 1 token = 1000000000)
        const burnIx = createBurnInstruction(
            account.address,
            mintPublicKey,
            wallet.publicKey,
            amount
        );

        const tx = new Transaction().add(burnIx);
        const signature = await connection.sendTransaction(tx, [wallet]);

        console.log("------------------------------------");
        console.log("🔥 BURN COMPLETE. LPs PERMANENTLY LOCKED.");
        console.log(`📜 SIGNATURE: ${signature}`);
        console.log("------------------------------------");
    } catch (error) {
        console.error("❌ BURN FAILED:", error.message);
    }
}

// Note: To run this, you'd call burnTokens("MINT_ADDRESS", AMOUNT);

