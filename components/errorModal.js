import styles from '../styles/Modal.module.scss'
import Image from 'next/image'

export default function Modal({ closeModal }) {

  return (
    <div className={styles.container} onClick={closeModal}>
      <div className={`${styles.background} closeModal`}></div>
      <div className={`${styles.modal} ${styles.modalError}`}>
        <Image src="/error.svg" alt="Error" width={53} height={46} />
        <h3>Something went wrong!</h3>
        <p>There was an error, please try submitting your transaction again.</p>
        <div className={`${styles.close} closeModal`}>
          <Image className="closeModal" src="/close.svg" alt="Close modal" width={18} height={13} />
        </div>
      </div>
    </div>
  )
}
