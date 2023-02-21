import type { Component } from 'solid-js';
import { createSignal } from "solid-js";

import logo from './logo.svg';
import styles from './App.module.css';

// Works in both a Webapp (browser) or Node.js:
import { SequenceIndexerClient } from '@0xsequence/indexer'

const indexer = new SequenceIndexerClient('https://polygon-indexer.sequence.app')

const contractAddress = '...'
const accountAddress = '...'

const App: Component = () => {
  const [loggedIn, setLoggedIn] = createSignal(false);

  const login = async () => {
    // query Sequence Indexer for all nft balances of the account on Polygon
    const nftBalances = await indexer.getTokenBalances({
        contractAddress: contractAddress,
        accountAddress: accountAddress,
        includeMetadata: true
    })
    console.log('collection of items:', nftBalances)

    nftBalances.balances.map((balance) => {
      if(balance.contractAddress == contractAddress && (balance.balance as any) > 0) setLoggedIn(true)
    }) 
  }

  return (
    <div class={styles.App}>
      {
        loggedIn() 
          ? 
        (
          <>
          <p>Login</p> 
          <button onClick={login}></button>
          </>
        ): <p>🟢</p>
      }
    </div>
  );
};

export default App;
