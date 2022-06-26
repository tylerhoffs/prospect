import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Creator.module.scss'
import Header from '../components/header';
import Footer from '../components/footer';
import WalletContext from '../contexts/walletContext';
import { useContext, useState, useRef, useEffect } from "react";
import Button from '../components/button';
import Card from '../components/card';
import Nft from '../components/nft';
import Loading from '../components/loading';
import useInterval from "../utils/useInterval";
import { contractAddress as creatorContractAddress } from '../utils/creator-contract-address.js'
import { contractAbi as creatorContractAbi } from '../utils/creator-contract-abi.js'
import { contractAddress as tokenContractAddress } from '../utils/token-contract-address.js'
import { contractAbi as tokenContractAbi } from '../utils/token-contract-abi.js'
import { contractAddress as stakingContractAddress } from '../utils/staking-contract-address.js'
import { contractAbi as stakingContractAbi } from '../utils/staking-contract-abi.js'
import Web3 from "web3";
import useScript from "../utils/useScript";
import { Framework } from "@superfluid-finance/sdk-core";
import SubModal from '../components/subModal';
import { ethers } from "ethers";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

export default function Creator() {
  useScript('js/background-gradient.js');
  const [selectedTab, setSelectedTab] = useState(0);
  const [locked, setLocked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [subModal, setSubModal] = useState(false);
  const [subAmount, setSubAmount] = useState();
  const [streams, setStreams] = useState();
  const [tokens, setTokens] = useState();
  const [revenue, setRevenue] = useState(232.032);
  const { walletAddress, connectWallet, clearWallet, walletObject, web3Modal } = useContext(WalletContext);

  const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai",
    cache: new InMemoryCache()
  });

  useInterval(() => {
    setRevenue(revenue + 0.001)
  }, 10);

  const STREAMS_QUERY = gql`
  {
    streams(where:{
          sender: "${walletAddress}"
          receiver: "${creatorContractAddress.toLowerCase()}"
        }
      ) {
      token {
        id
        symbol
      }
      createdAtTimestamp
      updatedAtTimestamp
      currentFlowRate
      streamedUntilUpdatedAt
        }
    }
  `;

  const closeModal = (event) => {
    if(Array.from(event.target.classList).includes('closeModal')) {
      setSubModal(false);
    }
  }

  function calculateFlowRate(amountInEther) {
    if (
      typeof Number(amountInEther) !== "number" ||
      isNaN(Number(amountInEther)) === true
    ) {
      console.log(typeof Number(amountInEther));
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amountInEther) === "number") {
      const monthlyAmount = ethers.utils.parseEther(amountInEther.toString());
      const calculatedFlowRate = Math.floor(monthlyAmount / 3600 / 24 / 30);
      return calculatedFlowRate;
    }
  }

  useEffect(() => {
    console.log("streams");
    console.log(streams);
    let activeStream = false;

    if(streams && streams.data.streams) {
      streams.data.streams.forEach(stream => {
        if(stream.currentFlowRate > 0) {
          setLocked(false);
        }
      })
    }
    
  }, [streams]);

  useEffect(() => {
    if (walletAddress) {

      client.query({query: gql`
      {
        streams(where:{
              sender: "${walletAddress.toLowerCase()}"
              receiver: "${creatorContractAddress.toLowerCase()}"
            }
          ) {
          token {
            id
            symbol
          }
          createdAtTimestamp
          updatedAtTimestamp
          currentFlowRate
          streamedUntilUpdatedAt
            }
        }
      `}).then(result => setStreams(result));

      client.query({query: gql`
      {
        accounts(where: {
          id: "${walletAddress.toLowerCase()}"
          }) {
          subscriptions{
              index {
                token{
                  symbol
                }
              }
              id
              approved
              units
              totalAmountReceivedUntilUpdatedAt
          }
        }
      }
      `}).then(result => setTokens(result.data.accounts[0].subscriptions[0].units));



      

      
    }
  }, [walletAddress]);

  async function stakeTokens() {
    //CONTRACT INTERACTION
    //setLoading(true);
    const tokenContract = new walletObject.current.eth.Contract(tokenContractAbi, tokenContractAddress);
    tokenContract.methods.send(stakingContractAddress,1,[]).call({from: walletAddress}).then((res) => {
      console.log(res,"res");
      if (res.status == true) {
        console.log("TRUE")
      }
      setLoading(false);
    }).catch(e => {
      console.log(e);
      setLoading(false);
    });
  }

  async function createNewFlow() {
    const recipient = creatorContractAddress;
    const flowRate = calculateFlowRate(subAmount);
    // const provider = walletObject.current;
    // const signer = provider.getSigner();
    const childProvider = await web3Modal.current.connect();
    const provider = new ethers.providers.Web3Provider(childProvider);

    const signer = provider.getSigner();

    console.log("signer");
    console.log(signer);
  
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider
    });
  
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
  
    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        receiver: recipient,
        flowRate: flowRate,
        superToken: DAIx
        // userData?: string
      });
  
      console.log("Creating your stream...");
  
      const result = await createFlowOperation.exec(signer);
      console.log(result);
  
      console.log(
        `Congrats - you've just created a money stream!
      View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
      Network: Kovan
      Super Token: DAIx
      Sender: ${signer}
      Receiver: ${recipient},
      FlowRate: ${flowRate}
      `
      );
      setSubModal(false);
      setLocked(false);
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Prospect - Nancy Sinatra</title>
        <meta name="description" content="Discover • Support • Earn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className={styles.row}>
        <main className={styles.main}>
          <Image src="/profile.png" width="256" height="256"/>
          <div className={styles.name}>
            Nancy Sinatra
          </div>
          <div className={styles.address}>
            0x196...2399a
          </div>
          <div className={styles.bio}>
            Hi, I&apos;m Nancy and I create educational web3 content. Subscribe to my prospect to get behind the scenes content and early access to exclusive content.
          </div>
          <div className={styles.categories}>
            <div className={styles.category}>
              web3
            </div>
            <div className={styles.category}>
              educational
            </div>
            <div className={styles.category}>
              video
            </div>
          </div>

        </main>

        <div className={styles.section}> 
          <div className={styles.tabs}> 
            <div className={`${styles.tab} ${selectedTab == 0 ? styles.selected : ""}`} onClick={()=> setSelectedTab(0)}> 
              Feed
            </div>
            <div className={`${styles.tab} ${selectedTab == 1 ? styles.selected : ""}`} onClick={()=> setSelectedTab(1)}> 
              Stake
            </div>
            <div className={`${styles.tab} ${selectedTab == 2 ? styles.selected : ""}`} onClick={()=> setSelectedTab(2)}> 
              Engage
            </div>
          </div>
          <div className={`${styles.content} ${selectedTab == 0 ? styles.visible : ""}`}> 
            {locked ? (
              <div className={styles.overlay}>
                <div className={styles.title}>
                  <Image src="/lock.svg" width="24" height="24"/>
                  <p>Content Locked</p>
                </div>
                <div className={styles.message}>
                  Connect a wallet that is already subscribed or start a subscription stream to unlock exclusive content and rewards from this creator!
                </div>
                <div className={styles.actions}>
                  {walletAddress !== undefined && walletAddress !== "" ? (
                    <>
                      <Button text="Disconnect" onClick={() => {clearWallet.current()}} extraClasses="ghost small"/>
                      <Button text="Subscribe" onClick={() => {setSubModal(true)}} extraClasses="small"/>
                    </>
                  ) : (
                    <Button text="Connect Wallet" onClick={() => {connectWallet.current()}}/>
                  )}
                </div>
              </div>
            ) : ("")}
            <div className={styles.cards}>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
            </div>
          </div>

          <div className={`${styles.content} ${selectedTab == 1 ? styles.visible : ""}`}> 
            <div className={styles.title}>
              <Image src="/stake.svg" width="24" height="24"/>
              <p>Loyalty Staking</p>
            </div>
            <div className={styles.message}>
              Stake loyalty tokens from this creator to earn your part of their revenue share!
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                Tokens Staked: <b>23233</b>
              </div>
              <div className={styles.stat}>
                Revenue Earned: <b>${revenue.toFixed(3)}</b>
              </div>
              <div className={styles.stat}>
                Tokens Owned: <b>2344</b>
              </div>
            </div>
            <div className={styles.actions}>
              {walletAddress !== undefined && walletAddress !== "" ? (
                <>
                  <Button text="Unstake" onClick={() => {clearWallet.current()}} extraClasses="ghost small"/>
                  <Button text="Stake" onClick={stakeTokens} extraClasses="small"/>
                </>
              ) : (
                <Button text="Connect Wallet" onClick={() => {connectWallet.current()}}/>
              )}
            </div>
          </div>

          <div className={`${styles.content} ${selectedTab == 2 ? styles.visible : ""}`}> 
            <div className={styles.title}>
              <Image src="/money.svg" width="24" height="24"/>
              <p>Spend Your Loyalty</p>
            </div>
            <div className={styles.message}>
              Buy exclusive NFTs, merch and much more from your favourite creators!
            </div>
            <div className={styles.nfts}>
              <Nft/>
              <Nft/>
            </div>
            <div className={styles.nfts}>
              <Nft/>
              <Nft/>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <div className={styles.static}></div>
      <canvas id="gradient-canvas" className={styles.grad} data-transition-in></canvas>
      
      {subModal ? <SubModal closeModal={closeModal} subAmount={subAmount} setSubAmount={setSubAmount} createNewFlow={createNewFlow}/> : null}
      {loading ? <Loading /> : null}
    </div>
  )
}
