import type { Component } from 'solid-js';
import { createSignal } from "solid-js";

import logo from './logo.svg';
import styles from './App.module.css';

import { sequence } from '0xsequence'
import { SequenceIndexerClient } from '@0xsequence/indexer'

const indexer = new SequenceIndexerClient('https://polygon-indexer.sequence.app')

const App: Component = () => {
  const [loggedIn, setLoggedIn] = createSignal(false);
  const contractAddress = '0x22d5f9B75c524Fec1D6619787e582644CD4D7422'
  let accountAddress: any = '.'

  const wallet = sequence.initWallet('polygon')

  const login = async () => {
    const wallet = sequence.getWallet()
  
    const connectWallet = await wallet.connect({
      // networkId: goerlidChainId,
      app: 'drop',
      authorize: true,
      settings: {
        theme: 'dark'
      }
    })

    accountAddress = connectWallet.session?.accountAddress
    console.log(connectWallet.connected)

    // query Sequence Indexer for all nft balances of the account on Polygon
    const nftBalances = await indexer.getTokenBalances({
        contractAddress: contractAddress,
        accountAddress: accountAddress,
        includeMetadata: true
    })
    
    if(nftBalances.balances.length > 0 && connectWallet.connected) setLoggedIn(true)
  }

  return (
    <div class={styles.App}>
      {
        ! loggedIn() 
          ? 
        (
          // build any custom login experience
            <button onClick={login}>login</button>
        ): (
          // include any component here
          <p>🟢</p>
        )
      }
    </div>
  );
};

export default App;
