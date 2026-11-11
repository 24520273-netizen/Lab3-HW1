import styles from './DrumPad.module.css'

export default function DrumPad({
  pad,
  isActive = false,
  onTrigger,
  onPress,
  onRelease,
}) {
  return (
    <button
      type="button"
      className={styles.pad}
      aria-pressed={Boolean(isActive)}
      onClick={() => onTrigger?.(pad.id)}
      onPointerDown={(event) => {
        if (event.pointerType !== 'mouse' || event.button === 0) {
          onPress?.(pad.id)
        }
      }}
      onPointerUp={() => onRelease?.(pad.id)}
      onPointerCancel={() => onRelease?.(pad.id)}
      onPointerLeave={() => onRelease?.(pad.id)}
      onBlur={() => onRelease?.(pad.id)}
    >
      <kbd className={styles.key}>{pad.keyLabel}</kbd>
      <span className={styles.sound}>{pad.soundName}</span>
    </button>
  )
}
