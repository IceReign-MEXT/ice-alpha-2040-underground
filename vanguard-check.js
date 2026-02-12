// IceReign-MEXT: Vanguard Connection Test (V3 Resilience)
const { Connection } = require("@solana/web3.js");
require('dotenv').config();

async function checkNetwork() {
    // Extracting the full URL from your .env
    const rpcUrl = process.env.RPC_URL;

    if (!rpcUrl || !rpcUrl.startsWith('http')) {
        console.error("❌ ARCHITECT ERROR: RPC_URL is invalid in .env");
        return;
    }

    // Creating a direct connection to the Solana cluster via Helius
    const connection = new Connection(rpcUrl, 'confirmed');

    try {
        console.log("📡 INITIATING VANGUARD SCAN...");

        // Fetching recent performance samples to calculate TPS manually
        const samples = await connection.getRecentPerformanceSamples(1);
        const tps = samples[0].numTransactions / samples[0].samplePeriodSecs;
        const slot = await connection.getSlot();

        console.log("------------------------------------");
        console.log("🛡️ VANGUARD ENGINE: ONLINE");
        console.log(`📡 NETWORK SLOT: ${slot}`);
        console.log(`⚡ CURRENT TPS: ${Math.round(tps)}`);
        console.log("🔐 STATUS: FORTRESS SECURED");
        console.log("------------------------------------");
    } catch (error) {
        console.error("❌ CONNECTION BREACHED:", error.message);
        console.log("TIP: Ensure your .env has RPC_URL=https://mainnet.helius-rpc.com/?api-key=your-key");
    }
}

checkNetwork();

