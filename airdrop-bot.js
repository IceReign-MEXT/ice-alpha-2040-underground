const { Connection, Keypair, PublicKey, Transaction } = require("@solana/web3.js");
const { getOrCreateAssociatedTokenAccount, createTransferInstruction } = require("@solana/spl-token");
require('dotenv').config();

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

async function executeAirdrop(recipient, amount) {
    const connection = new Connection(process.env.RPC_URL, "confirmed");
    const wallet = Keypair.fromSecretKey(decodeBase58(process.env.PRIVATE_KEY.trim()));
    const mint = new PublicKey("3kAeMSrgLqyX2TBTT2BXgugGLkXpznenfLjs4Q2BWqtW");

    console.log(`🧊 ALIEN BRAIN: Initiating transfer of ${amount} $ICE...`);
    
    try {
        const fromAta = await getOrCreateAssociatedTokenAccount(connection, wallet, mint, wallet.publicKey);
        const toAta = await getOrCreateAssociatedTokenAccount(connection, wallet, mint, new PublicKey(recipient));

        const tx = new Transaction().add(
            createTransferInstruction(fromAta.address, toAta.address, wallet.publicKey, amount * 1000000000)
        );

        const sig = await connection.sendTransaction(tx, [wallet]);
        console.log(`💰 PROFIT SECURED: TX: ${sig}`);
    } catch (e) {
        console.error("❌ WEAPON JAMMED:", e.message);
    }
}

// executeAirdrop("RECIPIENT_ADDRESS", 10000000);
