const { Connection, Keypair, Transaction, PublicKey } = require("@solana/web3.js");
const { createCloseAccountInstruction, TOKEN_PROGRAM_ID } = require("@solana/spl-token");
require('dotenv').config();

// Standard Base58 Alphabet
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
    // Handle leading '1's (which represent zero bytes in base58)
    for (let i = 0; i < str.length && str[i] === '1'; i++) bytes.unshift(0);
    return new Uint8Array(bytes);
};

async function reclaimSol() {
    const connection = new Connection(process.env.RPC_URL, "confirmed");
    const targetAddress = "3KJZZxQ7yYNLqNzsxN33x1V3pav2nRybtXXrBpNm1Zqf";

    let wallet;
    try {
        const rawKey = process.env.PRIVATE_KEY.trim();
        let decoded = decodeBase58(rawKey);

        // Try to find the valid 64-byte subset
        if (decoded.length === 65) {
            const try1 = decoded.slice(0, 64);
            const try2 = decoded.slice(1);

            try {
                const kp1 = Keypair.fromSecretKey(try1);
                if (kp1.publicKey.toBase58() === targetAddress) decoded = try1;
            } catch (e) {
                const kp2 = Keypair.fromSecretKey(try2);
                if (kp2.publicKey.toBase58() === targetAddress) decoded = try2;
            }
        }

        wallet = Keypair.fromSecretKey(decoded);
    } catch (e) {
        console.error(`❌ LOGIN FAILED: The key in .env does not match wallet ${targetAddress}`);
        return;
    }

    console.log(`🛡️ LOGGED IN AS: ${wallet.publicKey.toBase58()}`);

    try {
        const accounts = await connection.getParsedTokenAccountsByOwner(wallet.publicKey, {
            programId: TOKEN_PROGRAM_ID,
        });

        const emptyAccounts = accounts.value.filter(
            (acc) => acc.account.data.parsed.info.tokenAmount.uiAmount === 0
        );

        if (emptyAccounts.length === 0) {
            console.log("✨ NO EMPTY ACCOUNTS. WALLET IS CLEAN.");
            return;
        }

        console.log(`♻️ RECLAIMING ${emptyAccounts.length} ACCOUNTS...`);
        const tx = new Transaction();
        emptyAccounts.forEach(acc => {
            tx.add(createCloseAccountInstruction(new PublicKey(acc.pubkey), wallet.publicKey, wallet.publicKey));
        });

        const sig = await connection.sendTransaction(tx, [wallet]);
        console.log(`💰 SUCCESS! RECLAIMED SOL. TX: ${sig}`);
    } catch (err) { console.error("❌ ERROR:", err.message); }
}

reclaimSol();

