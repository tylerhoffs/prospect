import styles from '../styles/Footer.module.scss'
import Button from './button'
import Image from 'next/image'
import { contractAddress } from '../utils/contract-address.js'

export default function Footer() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.outer}>
          ETHNewYork 2022
        </div>
        <div className={styles.row}>  
          <a className={styles.link} href="https://twitter.com/fanstream" target="_blank" rel="noreferrer">
            <Image src="/twitter.svg" alt="Twitter Link" width={32} height={26} />
          </a>
          <a className={styles.link} href={"https://etherscan.com/address/"+contractAddress} target="_blank" rel="noreferrer">
            <Image src="/etherscan.svg" alt="Etherscan Link" width={30} height={30} />
          </a>
        </div>
      </div>
    </div>
  )
}
