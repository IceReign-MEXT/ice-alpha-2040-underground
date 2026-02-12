#!/bin/bash
ARCHITECT="3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf"
RPC="https://mainnet.helius-rpc.com/?api-key=91d5e3ce-6390-4096-8195-b988ed14400d"

clear
BAL=$(curl -s -X POST $RPC -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getBalance", "params":["'$ARCHITECT'"]}' | jq '.result.value')
SOL=$(echo "scale=4; $BAL / 1000000000" | bc)

echo "===================================================="
echo "        🧊 ICE-ALPHA: ALIEN BRAIN DASHBOARD 🧊      "
echo "            [ UNDERGROUND BYPASS v2040 ]            "
echo "===================================================="
echo "💎 Balance: $SOL SOL"
echo "🧬 4% Loop:  $(echo "scale=6; $SOL * 0.04" | bc) SOL"
echo "📡 2% Root:  .000022 SOL (Active)"
echo "----------------------------------------------------"
echo "🏫 TRAINING SCHOOL: @IceAlphaVanguard_Bot"
echo "🏰 THE CHAMBER: https://t.me/+cBM1zJPe8g01OGFk"
echo "----------------------------------------------------"
echo "⚠️ STATUS: Awaiting 0.014 SOL for Metadata Forge."
echo "===================================================="
