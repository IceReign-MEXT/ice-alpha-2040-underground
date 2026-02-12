const { Connection, PublicKey, Keypair, Transaction, sendAndConfirmTransaction } = require("@solana/web3.js");
const { createBurnCheckedInstruction, getAssociatedTokenAddress } = require("@solana/spl-token");
require('dotenv').config();

const connection = new Connection(process.env.RPC_URL, "confirmed");
const secretKey = Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY_JSON || "[]"));
const architect = Keypair.fromSecretKey(secretKey);

async function burnLiquidity(lpMintAddress) {
    console.log("🔥 INITIATING LIQUIDITY SELF-DESTRUCT...");
    const lpMint = new PublicKey(lpMintAddress);
    const ata = await getAssociatedTokenAddress(lpMint, architect.publicKey);
    
    // Get full balance to burn everything
    const accountInfo = await connection.getTokenAccountBalance(ata);
    
    const burnIx = createBurnCheckedInstruction(
        ata, lpMint, architect.publicKey, accountInfo.value.amount, accountInfo.value.decimals
    );

    const tx = new Transaction().add(burnIx);
    const signature = await sendAndConfirmTransaction(connection, tx, [architect]);
    console.log(`❄️ LIQUIDITY FROZEN FOREVER: ${signature}`);
}

// Usage: node burn-logic.js <LP_MINT_ADDRESS>
if (process.argv[2]) burnLiquidity(process.argv[2]);
else console.log("⚠️ Provide the LP Mint Address to burn.");
