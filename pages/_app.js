import '../styles/globals.css'
import { WalletProvider } from '../contexts/walletContext';

const EthApp = ({ Component, pageProps }) => (
  <WalletProvider>
    <Component {...pageProps} />
  </WalletProvider>
);

export default EthApp;
