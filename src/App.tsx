import type { Component } from 'solid-js';
import { createSignal } from "solid-js";

import logo from './logo.svg';
import styles from './App.module.css';

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

    if(nftBalances.balances.length > 0) setLoggedIn(true)
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