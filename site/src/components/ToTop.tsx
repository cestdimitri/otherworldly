'use client'

/** Кнопка прокрутки наверх. Уважает системную настройку «меньше движения». */
export function ToTop({ label }: { label: string }) {
  return (
    <button
      className="b b--sm"
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      }}
    >
      <span>↑ {label}</span>
    </button>
  )
}
