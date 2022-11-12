
import TonWeb from 'tonweb';
import * as mnemonic from 'tonweb-mnemonic';


const httpApiUrl = 'https://toncenter.com/api/v2/jsonRPC';


const provider = new TonWeb.HttpProvider(httpApiUrl, {
  /**
   * Get your own API key at: {@link https://t.me/tonapibot}
   */
  apiKey: '',
});

const tonweb = new TonWeb(provider);


export async function createNewWallet(): Promise<string> {

  const words = await mnemonic.generateMnemonic();

  const keyPair = await mnemonic.mnemonicToKeyPair(words);

  const wallet = new TonWeb.Wallets.all.v4R2(provider, {
    publicKey: keyPair.publicKey,
  });

  const address = await wallet.getAddress();

  return address.toString(true, true, true);

}

export async function getBalance(address: string): Promise<string> {

  const info = await provider.getWalletInfo(address);

  return tonweb.utils.fromNano(info.balance);

}
