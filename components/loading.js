import styles from '../styles/Loading.module.scss'

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <span className={styles.loader}></span>
    </div>
  )
}
