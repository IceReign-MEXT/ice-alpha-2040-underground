#!/bin/bash
clear
echo "===================================================="
echo "        🧊 ICE-ALPHA: WEAPON INSPECTOR 2040 🧊      "
echo "===================================================="

# Check Files
files=("ice-airdrop-bot.js" "burn-logic.js" "ice-metadata.json" "dashboard.sh" "Procfile")
for f in "${files[@]}"; do
    if [ -f "$f" ]; then
        echo "✅ $f: DETECTED"
    else
        echo "❌ $f: MISSING"
    fi
done

echo "----------------------------------------------------"
echo "📡 NETWORK SCAN:"
node -e '
const { Connection, PublicKey } = require("@solana/web3.js");
require("dotenv").config();
const conn = new Connection(process.env.RPC_URL);
conn.getBalance(new PublicKey("3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf")).then(b => {
    console.log("💎 Architect Balance: " + (b/1e9) + " SOL");
    if ((b/1e9) < 0.014) console.log("⚠️ STATUS: AWAITING 0.014 SOL FOR METADATA FORGE");
    else console.log("🔥 STATUS: READY FOR MAINNET DEPLOYMENT");
});'

echo "----------------------------------------------------"
echo "🤖 BOT STATUS:"
node vanguard-check.js
echo "===================================================="
