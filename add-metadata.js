const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults");
const { createMetadataAccountV3 } = require("@metaplex-foundation/mpl-token-metadata");
const { keypairIdentity, publicKey } = require("@metaplex-foundation/umi");
const bs58 = require("bs58");
require('dotenv').config();

async function addMetadata() {
    const umi = createUmi(process.env.RPC_URL);

    // Industrial-grade key handling
    const decoder = bs58.decode ? bs58 : bs58.default;
    const secretKey = Uint8Array.from(decoder.decode(process.env.PRIVATE_KEY.trim()));
    const keypair = umi.eddsa.createKeypairFromSecretKey(secretKey);
    umi.use(keypairIdentity(keypair));

    console.log("🛡️ IDENTITY VERIFIED. ATTACHING METADATA...");

    const mintAddress = publicKey("3kAeMSrgLqyX2TBTT2BXgugGLkXpznenfLjs4Q2BWqtW");

    try {
        await createMetadataAccountV3(umi, {
            mint: mintAddress,
            mintAuthority: umi.identity,
            data: {
                name: "IceAlpha",
                symbol: "ICE",
                uri: "https://arweave.net/y66Y6_D5uM9uV8r6eX_your_json_here", // We will replace this with your actual logo link
                sellerFeeBasisPoints: 0,
                creators: null,
                collection: null,
                uses: null,
            },
            isMutable: true,
            collectionDetails: null,
        }).sendAndConfirm(umi);

        console.log("------------------------------------");
        console.log("✅ METADATA ATTACHED!");
        console.log("Your token now has a Name and Symbol.");
        console.log("------------------------------------");
    } catch (e) {
        console.error("❌ METADATA FAILED:", e.message);
    }
}

addMetadata();

