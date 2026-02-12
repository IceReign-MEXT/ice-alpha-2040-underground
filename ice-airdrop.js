const { Connection, Keypair, PublicKey, Transaction } = require("@solana/web3.js");
const { getOrCreateAssociatedTokenAccount, createTransferInstruction } = require("@solana/spl-token");
const bs58 = require("bs58");
require('dotenv').config();

const MINT_ADDRESS = "3kAeMSrgLqyX2TBTT2BXgugGLkXpznenfLjs4Q2BWqtW";

// LIST OF RECIPIENTS (Add addresses of people who raid your posts!)
const RECIPIENTS = [
    { address: "TARGET_WALLET_1", amount: 1000000 },
    { address: "TARGET_WALLET_2", amount: 1000000 },
];

async function runAirdrop() {
    const connection = new Connection(process.env.RPC_URL, "confirmed");
    const architect = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY));
    const mint = new PublicKey(MINT_ADDRESS);

    console.log("❄️ ICEALPHA AIRDROP INITIATED...");

    const sourceAccount = await getOrCreateAssociatedTokenAccount(connection, architect, mint, architect.publicKey);
    const tx = new Transaction();

    for (const recipient of RECIPIENTS) {
        const destAccount = await getOrCreateAssociatedTokenAccount(connection, architect, mint, new PublicKey(recipient.address));

        tx.add(createTransferInstruction(
            sourceAccount.address,
            destAccount.address,
            architect.publicKey,
            recipient.amount * Math.pow(10, 9)
        ));
    }

    const signature = await connection.sendTransaction(tx, [architect]);
    console.log(`✅ AIRDROP COMPLETE! Signature: ${signature}`);
}

runAirdrop();

