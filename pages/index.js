import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Header from '../components/header';
import Footer from '../components/footer';
import WalletContext from '../contexts/walletContext';
import { useContext, useState, useRef, useEffect } from "react";
import Button from '../components/button';
import Loading from '../components/loading';
import useInterval from "../utils/useInterval";
import { contractAddress as contractAddress } from '../utils/contract-address.js'
import { contractAbi as contractAbi } from '../utils/contract-abi.js'
import Web3 from "web3";
import useScript from "../utils/useScript";

export default function Home() {
  useScript('js/background-gradient.js');
  const [loading, setLoading] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>prospect</title>
        <meta name="description" content="Discover • Support • Earn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <Image src="/title.svg" width="730" height="400"/>
        <div className={styles.sub}>Generate recurring income with <a href="https://superfluid.finance" target="_blank" rel="noreferrer">SuperFluid</a> streams from fans. Distribute loyalty tokens and share the success with your most dedicated supporters.</div>
        <div className={styles.more}>
          learn More
          <div className={styles.mouse}>
            <span className={styles.wheel}></span>
          </div>
          
        </div>
      </main>

      <div className={styles.section}>
        <h1>discover</h1>
        <p>find the diamonds in the rough. new creators are joining our platform daily looking to entertain. the earlier you discover a creator, the greater your potential is to earn.</p>
        <div className={styles.right}>
          <h1>support</h1>
          <p>let creators know that you&apos;re enjoying their content by streaming a suscription fee directly to them. gain access to exclusive content and perks.</p>
        </div>
        <h1>earn</h1>
        <p>creators earn a steady stream of income so they feel comfortable constantly creating and fans earn loyalty tokens that can entitle them to a revenue share if staked and can also be used to buy exclusive creator nfts or merch.</p>
      </div>

      <Footer />

      <div className={styles.static}></div>
      <canvas id="gradient-canvas" className={styles.grad} data-transition-in></canvas>

      {loading ? <Loading /> : null}
    </div>
  )
}
