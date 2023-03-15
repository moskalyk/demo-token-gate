import type { Component } from 'solid-js';
import { createSignal } from "solid-js";

import logo from './logo.svg';
import styles from './App.module.css';

import { sequence } from '0xsequence'
import { SequenceIndexerClient } from '@0xsequence/indexer'

const indexer = new SequenceIndexerClient('https://mumbai-indexer.sequence.app')

const App: Component = () => {
  const [address, setAddress] = createSignal<string>('');

  const [loggedIn, setLoggedIn] = createSignal(false);
  const contractAddress = '0xdC60AfD3926c123B1fc3bDBF15c57AACB5046B99'
  let accountAddress: any = '.'

  const wallet = sequence.initWallet('mumbai')

  const login = async () => {
    const wallet = sequence.getWallet()
  
    const connectWallet = await wallet.connect({
      // networkId: goerlidChainId,
      app: 'drop',
      authorize: true,
      settings: {
        theme: 'dark'
      },
      expiry: 1
    })

    setTimeout(() => {
      // this should be logged out
      wallet.openWallet()
    }, 5000)

    console.log(connectWallet)
    accountAddress = connectWallet.session?.accountAddress

    // query Sequence Indexer for all nft balances of the account on Polygon
    const nftBalances = await indexer.getTokenBalances({
        contractAddress: contractAddress,
        accountAddress: accountAddress,
        includeMetadata: true
    })
    console.log(nftBalances)
    
    if(nftBalances.balances.length > 0 && connectWallet.connected) {
      setLoggedIn(true)
      setAddress(accountAddress)
    }
  }

  return (
    <div class={styles.App}>
      {
        ! loggedIn() 
          ? 
        (
          // build any custom login experience
            <button onClick={login}>{address().length < 1 ? 'connect' : address()}</button>
        ): (
          // include any component here
          <>
            <p>🟢</p>
            <button onClick={login}>{address().length < 1 ? 'connect' : address()}</button>
          </>
        )
      }
    </div>
  );
};

export default App;