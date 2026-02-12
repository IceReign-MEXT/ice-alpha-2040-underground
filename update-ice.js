const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults");
const { createMetadataAccountV3 } = require("@metaplex-foundation/mpl-token-metadata");
const { keypairIdentity, publicKey } = require("@metaplex-foundation/umi");
const bs58 = require("bs58");
require('dotenv').config();

async function updateIceIdentity() {
    const umi = createUmi(process.env.RPC_URL);

    // The key decoding that works for your Termux
    const decoder = bs58.decode ? bs58 : bs58.default;
    const secretKey = Uint8Array.from(decoder.decode(process.env.PRIVATE_KEY.trim()));
    const keypair = umi.eddsa.createKeypairFromSecretKey(secretKey);
    umi.use(keypairIdentity(keypair));

    console.log("❄️ ATTACHING IDENTITY TO ICEALPHA...");

    const mint = publicKey("3kAeMSrgLqyX2TBTT2BXgugGLkXpznenfLjs4Q2BWqtW");

    try {
        await createMetadataAccountV3(umi, {
            mint: mint,
            mintAuthority: umi.identity,
            data: {
                name: "IceAlpha",
                symbol: "ICE",
                uri: "https://raw.githubusercontent.com/your-repo/main/ice.json", // We'll update this
                sellerFeeBasisPoints: 0,
                creators: null,
                collection: null,
                uses: null,
            },
            isMutable: true,
            collectionDetails: null,
        }).sendAndConfirm(umi);

        console.log("------------------------------------");
        console.log("💎 ICEALPHA IDENTITY ESTABLISHED!");
        console.log("Check Solscan in 2-3 minutes.");
        console.log("------------------------------------");
    } catch (err) {
        console.error("❌ UPDATE FAILED:", err.message);
    }
}

updateIceIdentity();

