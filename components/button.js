import styles from '../styles/Button.module.scss'

export default function Button({ text, onClick, extraClasses }) {
  return (
    <div className={`button ${styles.button} ${extraClasses}`} onClick={onClick}>
      {text}
    </div>
  )
}
