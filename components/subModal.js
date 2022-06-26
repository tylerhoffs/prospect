import styles from '../styles/Modal.module.scss'
import Image from 'next/image'
import Button from './button'

export default function SubModal({ closeModal, createNewFlow, subAmount, setSubAmount }) {

  return (
    <div className={styles.container} onClick={closeModal}>
      <div className={`${styles.background} closeModal`}></div>
      <div className={`${styles.modal} ${styles.modalSub}`}>
        <h3>Subscribe to Nancy Sinatra</h3>
        <p>Please enter how much fDAIx you would like to contribute per month.</p>
        <div className={`${styles.close} closeModal`}>
          <Image className="closeModal" src="/close.svg" alt="Close modal" width={24} height={24} />
        </div>
        <input type="number" placeholder="Amount" value={subAmount} onChange={(e)=>setSubAmount(e.target.value)}/>
        <Button text="Create Stream" onClick={createNewFlow} extraClasses="small"/>
      </div>
    </div>
  )
}
