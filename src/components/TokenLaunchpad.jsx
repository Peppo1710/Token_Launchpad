import { useState } from "react"
import { createInitializeAccount2Instruction, createMint, getMinimumBalanceForRentExemptAccount, MINT_SIZE,TOKEN_PROGRAM_ID } from "@solana/spl-token";
// import { useConnection , use } from "@solana/web3.js";
import { useConnection,useWallet } from "@solana/wallet-adapter-react";
import { Connection, Keypair, SystemProgram , Transaction } from "@solana/web3.js";
import { createInitializeMint2Instruction } from "@solana/spl-token";

export default function TokenLaunchpad() {
    const wallet = useWallet();
    const {connection} = useConnection();

    const [Name, setName] = useState('');
    const [Symbol, setSymbol] = useState('');
    const [Image, setImage] = useState('');
    const [InitialSupply, setInitialSupply] = useState('');

    async function onClicked() {
    if (!wallet.publicKey) {
        console.error("Wallet not connected");
        return;
    }

    const mintPayer = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptAccount(connection);

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintPayer.publicKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID
        }),
        createInitializeMint2Instruction(
            mintPayer.publicKey,
            9, // decimals
            wallet.publicKey,
            wallet.publicKey,
            TOKEN_PROGRAM_ID
        )
    );

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    transaction.partialSign(mintPayer);

    try {
        const txid = await wallet.sendTransaction(transaction, connection);
        console.log(` Token mint created at ${mintPayer.publicKey.toBase58()}`);
        console.log(`🔗 Transaction ID: https://explorer.solana.com/tx/${txid}?cluster=devnet`);
    } catch (err) {
        console.error(" Transaction failed", err);
    }
}

    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input
            className='inputText'
            type='text'
            placeholder='Name'
            value={Name}
            onChange={e => setName(e.target.value)}
        /> <br />
        <input
            className='inputText'
            type='text'
            placeholder='Symbol'
            value={Symbol}
            onChange={e => setSymbol(e.target.value)}
        /> <br />
        <input
            className='inputText'
            type='text'
            placeholder='Image URL'
            value={Image}
            onChange={e => setImage(e.target.value)}
        /> <br />
        <input
            className='inputText'
            type='text'
            placeholder='Initial Supply'
            value={InitialSupply}
            onChange={e => setInitialSupply(e.target.value)}
        /> <br />
        <button className='btn' onClick={onClicked}>Create a token</button>
    </div>
}