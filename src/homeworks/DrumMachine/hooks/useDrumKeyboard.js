import { useEffect, useRef, useState } from 'react'

const INTERACTIVE_SELECTOR = [
  'input',
  'textarea',
  'select',
  'button',
  'a[href]',
  'summary',
  '[contenteditable]',
  '[role="textbox"]',
  '[role="combobox"]',
  '[role="button"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[role="slider"]',
  '[role="spinbutton"]',
  '[role="tab"]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function shouldIgnoreDrumKeydown(event) {
  if (
    event.defaultPrevented ||
    event.repeat ||
    event.isComposing ||
    event.ctrlKey ||
    event.altKey ||
    event.metaKey
  ) {
    return true
  }

  const target = event.target

  return Boolean(
    target?.isContentEditable ||
    target?.closest?.(INTERACTIVE_SELECTOR)
  )
}

export function useDrumKeyboard(padMap, onTriggerPad, isEnabled = true) {
  const [activePadIds, setActivePadIds] = useState([])
  const triggerRef = useRef(onTriggerPad)

  useEffect(() => {
    triggerRef.current = onTriggerPad
  }, [onTriggerPad])

  useEffect(() => {
    if (!isEnabled) return undefined

    const heldCodes = new Set()

    const syncActivePads = () => {
      setActivePadIds(
        [...heldCodes].map((code) => padMap.get(code).id)
      )
    }

    const clearPressed = () => {
      if (heldCodes.size === 0) return

      heldCodes.clear()
      setActivePadIds([])
    }

    const onKeyDown = (event) => {
      const pad = padMap.get(event.code)

      if (!pad || shouldIgnoreDrumKeydown(event)) return
      if (heldCodes.has(event.code)) return

      event.preventDefault()

      heldCodes.add(event.code)
      syncActivePads()

      triggerRef.current?.(pad.id)
    }

    const onKeyUp = (event) => {
      if (!heldCodes.delete(event.code)) return

      syncActivePads()
    }

    const onVisibilityChange = () => {
      if (document.hidden) clearPressed()
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', clearPressed)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', clearPressed)
      document.removeEventListener('visibilitychange', onVisibilityChange)

      clearPressed()
    }
  }, [padMap, isEnabled])

  return isEnabled ? activePadIds : []
}
