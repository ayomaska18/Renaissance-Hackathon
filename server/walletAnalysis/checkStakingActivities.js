const solanaWeb3 = require('@solana/web3.js');

async function checkStakingActivities(walletAddress) {
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed');
    const publicKey = new web3.PublicKey(walletAddress);
    
    const stakeAccounts = await connection.getParsedProgramAccounts(
        web3.StakeProgram.programId,
        {
            filters: [
                {
                    dataSize: web3.StakeProgram.space,
                },
                {
                    memcmp: {
                        offset: web3.StakeProgram.layout.offsetOf('authorizedStaker'),
                        bytes: publicKey.toBase58(),
                    },
                },
            ],
        }
    );

    if (stakeAccounts.length > 0) {
        console.log(`Found ${stakeAccounts.length} stake account(s) associated with the wallet.`);
        stakeAccounts.forEach((account, index) => {
            const accountInfo = account.account.data.parsed.info;
            console.log(`Stake Account ${index + 1}:`);
            console.log(`- Address: ${account.pubkey.toBase58()}`);
            console.log(`- Stake Authority: ${accountInfo.meta.authorized.staker}`);
            console.log(`- Withdraw Authority: ${accountInfo.meta.authorized.withdrawer}`);
            console.log(`- Delegated Stake: ${accountInfo.stake.delegation.stake / web3.LAMPORTS_PER_SOL} SOL`);
            console.log(`- Delegated Voter (Validator): ${accountInfo.stake.delegation.voter}`);
            console.log(`- Activation Epoch: ${accountInfo.stake.delegation.activationEpoch}`);
            console.log(`- Deactivation Epoch: ${accountInfo.stake.delegation.deactivationEpoch}`);
        });
    } else {
        console.log('No staking activities found for this wallet.');
    }
}

module.exports = { checkStakingActivities };