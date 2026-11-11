import styles from './DrumPad.module.css'

export default function DrumPad({ pad, isActive = false, onTrigger }) {
  return (
    <button
      type="button"
      className={styles.pad}
      aria-pressed={Boolean(isActive)}
      onClick={() => onTrigger?.(pad.id)}
    >
      <kbd className={styles.key}>{pad.keyLabel}</kbd>
      <span className={styles.sound}>{pad.soundName}</span>
    </button>
  )
}
