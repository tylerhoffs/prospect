import '../styles/globals.css'
import { WalletProvider } from '../contexts/walletContext';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai",
  cache: new InMemoryCache()
});

const EthApp = ({ Component, pageProps }) => (
  <WalletProvider>
    <ApolloProvider  client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </WalletProvider>
);

export default EthApp;

