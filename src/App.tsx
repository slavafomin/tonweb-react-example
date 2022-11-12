
import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';
import { createNewWallet, getBalance } from './tonweb';


const address = 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N';


export default function App() {

  const [balance, setBalance] = useState<string | undefined>(
    undefined
  );

  const [newAddress, setNewAddress] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      setBalance(await getBalance(address));
    })();
  }, [address]);

  useEffect(() => {
    (async () => {
      setNewAddress(await createNewWallet());
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Address:<br/>
          <strong>{address}</strong>
        </p>
        { balance && (
          <p>
            Balance:<br/>
            <strong>{balance} TON</strong>
          </p>
        ) }
        { newAddress && (
          <p>
            New Wallet Address:<br/>
            <strong>{newAddress}</strong>
          </p>
        ) }
      </header>
    </div>
  );

}
