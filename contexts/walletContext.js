import { createContext, useState, useEffect, useRef } from 'react';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const connectWallet = useRef(null);
  const clearWallet = useRef(null);
  const walletObject = useRef(null);

  const [walletAddress, setWalletAddress] = useState();

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "6201d841e5c54b2ab5c7ea4d444b3324" // required
        }
      }
    };
    
    const web3Modal = new Web3Modal({
      network: "mainnet", //optional
      cacheProvider: true, // optional
      providerOptions // required
    });

    console.log("update connnect wallet current")
  
    connectWallet.current = async () => {
      console.log("connect wallet")
      const provider = await web3Modal.connect();
      walletObject.current = new Web3(provider);
      //walletObject.current = new Web3("http://127.0.0.1:8545/"); //LOCALHOST
      
      const accounts = await walletObject.current.eth.getAccounts();
      const address = accounts[0];
      setWalletAddress(address);
      console.log("set wallet address")

      if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
          setWalletAddress(accounts[0]);
        })
      }
    };

    clearWallet.current = async () => {
      if (walletObject.current && walletObject.current.currentProvider && walletObject.current.currentProvider.close) {
        await walletObject.current.currentProvider.close();
      }
      await web3Modal.clearCachedProvider();
      setWalletAddress(undefined);
    };  

    if (web3Modal.cachedProvider) {
      console.log("Cached Provider")
      connectWallet.current();
    }
  }, []);

  return (
    <WalletContext.Provider value={{walletAddress, connectWallet, clearWallet, walletObject}}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
