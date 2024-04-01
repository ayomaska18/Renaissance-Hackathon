const solanaWeb3 = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID } = require("@solana/spl-token");

async function getWalletBalance(walletAddress) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('testnet'), 'confirmed');
    const publicKey = new solanaWeb3.PublicKey(walletAddress);

    try {
        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / solanaWeb3.LAMPORTS_PER_SOL;

        console.log(`The balance of ${walletAddress} is ${balanceInSOL} SOL.`);
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

async function getTokenBalance(walletAddress) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('testnet'), 'confirmed');
    const publicKey = new solanaWeb3.PublicKey(walletAddress);

    const filters = [
        {
            dataSize: 165,
        },
        {
            memcmp: {
                offset: 32,
                bytes: publicKey.toBase58(),
            },
        },
    ];

    const accounts = await connection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,
        { filters, encoding: 'jsonParsed' }
    );

    console.log(`Found ${accounts.length} token account(s) for wallet.`);
    accounts.forEach((account, i) => {
        const parsedAccountInfo = account.account.data.parsed;
        const mintAddress = parsedAccountInfo.info.mint;
        const tokenBalance = parsedAccountInfo.info.tokenAmount.uiAmount;
        // console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
        console.log(`--Token Mint: ${mintAddress}`);
        console.log(`--Token Balance: ${tokenBalance}`);
    });

    const solBalance = await connection.getBalance(publicKey);
    console.log(`SOL Balance: ${solBalance / solanaWeb3.LAMPORTS_PER_SOL} SOL`);
}


module.exports = { getTokenBalance, getWalletBalance };