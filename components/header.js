import styles from '../styles/Header.module.scss'
import Button from './button'
import Image from 'next/image'
import Link from 'next/link'
import WalletContext from '../contexts/walletContext';
import { useContext, useState } from "react";

export default function Header({ timeString }) {
  const { walletAddress, connectWallet, clearWallet } = useContext(WalletContext);
  
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Link href="/"><a><Image src="/wordmark.svg" width="237" height="40"/></a></Link>
        {walletAddress !== undefined && walletAddress !== "" ? (
          <div className={styles.wallet}>
            <div className={styles.address}>{walletAddress.slice(0,5)}...{walletAddress.slice(-5)}</div>
            <Button text="Disconnect" onClick={() => {clearWallet.current()}}/>
          </div>
        ) : (
          <Button text="Connect Wallet" onClick={() => {connectWallet.current()}}/>
        )}
      </div>
    </div>
  )
}
