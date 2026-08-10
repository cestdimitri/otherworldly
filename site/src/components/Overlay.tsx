'use client'
import { useEffect, useRef } from 'react'
import styles from './Overlay.module.css'

/**
 * Окно поверх страницы — для портрета кураторки и для крупного кадра.
 *
 * Построено на родном <dialog>, а не на своём слое. Причина не в экономии:
 * <dialog> сам забирает фокус внутрь и не выпускает наружу, сам закрывается
 * по Esc и сам прячет остальную страницу от экранного диктора. Всё это,
 * написанное вручную, обычно оказывается написанным наполовину.
 */
export function Overlay({
  open, onClose, label, children,
}: { open: boolean; onClose: () => void; label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={styles.d}
      aria-label={label}
      onClose={onClose}
      // Клик по подложке закрывает: цель события — сам <dialog>,
      // а не его содержимое.
      onClick={(e) => { if (e.target === ref.current) onClose() }}
    >
      <div className={styles.in}>
        <button className={styles.x} onClick={onClose} aria-label="Закрыть">×</button>
        {children}
      </div>
    </dialog>
  )
}
