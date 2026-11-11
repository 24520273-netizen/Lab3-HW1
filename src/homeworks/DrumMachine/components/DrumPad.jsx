export default function DrumPad({ pad, isActive = false, onTrigger }) {
  return (
    <button
      type="button"
      aria-pressed={Boolean(isActive)}
      onClick={() => onTrigger?.(pad.id)}
    >
      <kbd>{pad.keyLabel}</kbd>
      <span>{pad.soundName}</span>
    </button>
  )
}
