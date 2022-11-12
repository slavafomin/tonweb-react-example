
# TonWeb React Example

This example demonstrates how to use [TonWeb](https://github.com/toncenter/tonweb) with React ([create-react-app](https://create-react-app.dev/)).

## Steps

1. Create new React app using CRA:
   
```shell
npx create-react-app tonweb-react-example --template typescript
```

2. Install TonWeb packages:
   
```shell
npm i -S tonweb tonweb-mnemonic
```

3. Install [Buffer polyfill](https://github.com/feross/buffer):
   
```shell
npm i -S buffer
```

4. Create `polyfills.ts` file to load the polyfill:

```ts
import { Buffer } from 'buffer'
globalThis.Buffer = Buffer
```

5. Import the `polyfills.ts` from the top of your `index.ts`
   (before all other imports):

```ts
import './polyfills';
 
// all other imports…
```

6. Create the TonWeb instance:

```ts
const httpApiUrl = 'https://toncenter.com/api/v2/jsonRPC';

const provider = new TonWeb.HttpProvider(httpApiUrl, {
    /**
     * Get your own API key at: {@link https://t.me/tonapibot}
     */
    apiKey: '',
});

const tonweb = new TonWeb(provider);
```

7. Use it in your components:
   
```tsx

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

async function createNewWallet(): Promise<string> {

  const words = await mnemonic.generateMnemonic();

  const keyPair = await mnemonic.mnemonicToKeyPair(words);

  const wallet = new TonWeb.Wallets.all.v4R2(provider, {
    publicKey: keyPair.publicKey,
  });

  const address = await wallet.getAddress();

  return address.toString(true, true, true);

}

async function getBalance(address: string): Promise<string> {

  const info = await provider.getWalletInfo(address);

  return tonweb.utils.fromNano(info.balance);

}

```

Look at [this commit](https://github.com/slavafomin/tonweb-react-example/commit/0d0dfa5f5fe440ec73e6f3d66542278cdd490dce) for example.
