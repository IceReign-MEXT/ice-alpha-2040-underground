const { Raydium, TxVersion, parseTokenAccountResp } = require('@raydium-io/raydium-sdk-v2');
const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const bs58 = require('bs58');
const BN = require('bn.js');
require('dotenv').config();

async function launchIceReignPool() {
    const connection = new Connection(process.env.RPC_URL, 'confirmed');
    const owner = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY));

    // Initialize the Raydium SDK
    const raydium = await Raydium.load({
        connection,
        owner,
        cluster: 'mainnet',
        disableFeatureCheck: true,
    });

    console.log("🚀 ARCHITECT IDENTIFIED: ", owner.publicKey.toBase58());

    // CONFIGURATION (Matches your Orion Tools screenshot)
    const baseMint = new PublicKey("YOUR_TOKEN_MINT_ADDRESS"); // Your IceAlpha token
    const quoteMint = new PublicKey("So11111111111111111111111111111111111111112"); // Native SOL

    // Amounts (Adjust based on your supply)
    const baseAmount = new BN(1000000000000); // e.g., 1000 tokens (if 9 decimals)
    const quoteAmount = new BN(1000000000);   // e.g., 1 SOL

    try {
        console.log("🛠️ PREPARING CPMM POOL INITIALIZATION...");

        const { execute, extInfo } = await raydium.cpmm.createPool({
            programId: new PublicKey('CPMMoo8LqUv98Zfsf7m7vNps99T3U6uBvUqS881qg92'), // Raydium CPMM Program
            poolFeeBps: 2500, // 0.25% fee tier from your screenshot
            baseAmount,
            quoteAmount,
            baseMintInfo: { mint: baseMint, decimals: 9 },
            quoteMintInfo: { mint: quoteMint, decimals: 9 },
            startTime: new BN(0), // Start immediately
            ownerInfo: { feePayer: owner.publicKey },
            txVersion: TxVersion.V0,
        });

        console.log("📡 SENDING TRANSACTION...");
        const { txId } = await execute();

        console.log("------------------------------------");
        console.log("🎉 ICE-REIGN POOL DEPLOYED!");
        console.log(`📍 POOL ID: ${extInfo.address}`);
        console.log(`📜 TX: https://solscan.io/tx/${txId}`);
        console.log("------------------------------------");

    } catch (error) {
        console.error("❌ DEPLOYMENT FAILED:", error);
    }
}

launchIceReignPool();

