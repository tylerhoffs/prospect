import styles from '../styles/Nft.module.scss'
import Button from './button'
import Image from 'next/image'

export default function Nft({ onClick, extraClasses }) {
  return (
    <div className={`nft ${styles.nft} ${extraClasses}`} onClick={onClick}>
      <img className={styles.image} src="/bg.png" />
      <div className={styles.text}>
        <div className={styles.title}>New York City Day 1: Central Park</div>
        <div className={styles.date}>345 Loyalty tokens</div>
        <div className={styles.actions}>
          <Button text="Mint" onClick={() => {}} extraClasses="small"/>
          <div className={styles.opensea}>
            View on Opensea &nbsp;
            <Image src="/ext.svg" width="16" height="16"/>
          </div>
        </div>
      </div>
    </div>
  )
}
