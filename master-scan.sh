#!/bin/bash
clear
echo "===================================================="
echo "      🧊 ICE-ALPHA: MASTER WEAPON SCAN 2040 🧊      "
echo "===================================================="

declare -A weapons
weapons=( 
    ["Vanguard Bot"]="ice-tg-bot.js" 
    ["Airdrop Engine"]="ice-airdrop-bot.js" 
    ["Whale Watcher"]="anti-dump.js" 
    ["Burn Logic"]="burn-logic.js" 
    ["Metadata Forge"]="add-metadata.js" 
)

for name in "${!weapons[@]}"; do
    file=${weapons[$name]}
    if [ -f "$file" ]; then
        echo -e "✅ $name: [ONLINE]"
    else
        echo -e "❌ $name: [OFFLINE - File Missing]"
    fi
done

echo "----------------------------------------------------"
echo "🛰️  SATELLITE SYNC:"
node vanguard-check.js
echo "===================================================="
