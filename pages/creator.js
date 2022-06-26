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
import { contractAddress as contractAddress } from '../utils/contract-address.js'
import { contractAbi as contractAbi } from '../utils/contract-abi.js'
import Web3 from "web3";
import useScript from "../utils/useScript";

export default function Creator() {
  useScript('js/background-gradient.js');
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [revenue, setRevenue] = useState(232.032);
  const [locked, setLocked] = useState(true);
  const { walletAddress, connectWallet, clearWallet } = useContext(WalletContext);

  useInterval(() => {
    setRevenue(revenue + 0.001)
  }, 10);

  return (
    <div className={styles.container}>
      <Head>
        <title>creator page</title>
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
                      <Button text="Subscribe" onClick={() => {setLocked(false)}} extraClasses="small"/>
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
                  <Button text="Stake" onClick={() => {}} extraClasses="small"/>
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

      {loading ? <Loading /> : null}
    </div>
  )
}
