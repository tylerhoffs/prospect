import styles from '../styles/Card.module.scss'
import Image from 'next/image'

export default function Card({ onClick, extraClasses }) {
  return (
    <div className={`card ${styles.card} ${extraClasses}`} onClick={onClick}>
      <img className={styles.image} src="/bg.png" />
      <div className={styles.text}>
        <div className={styles.date}>JUNE 13 AT 5:04 PM</div>
        <div className={styles.title}>New York City Day 1: Central Park</div>
        <div className={styles.desc}>I explore Central Park for the first time ever! After an intense subway ride I can't believe my eyes when I see the stark contrast of skyscrapers through countless trees.</div>
      </div>
    </div>
  )
}
