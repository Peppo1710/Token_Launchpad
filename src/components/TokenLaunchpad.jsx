import { useState } from "react"
import { createMint } from "@solana/spl-token";

export default function TokenLaunchpad() {
    const [Name, setName] = useState('');
    const [Symbol, setSymbol] = useState('');
    const [Image, setImage] = useState('');
    const [InitialSupply, setInitialSupply] = useState('');

    function onClicked(){
        
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