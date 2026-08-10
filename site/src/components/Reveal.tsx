'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * Проявление блока при прокрутке: из размытого свечения в резкость.
 *
 * Сделано так, чтобы не отвлекать:
 *  — срабатывает один раз и отключает наблюдение, а не мигает туда-сюда;
 *  — при системной настройке «меньше движения» показывает сразу, без анимации;
 *  — без JS содержимое всё равно видно: класс скрытия навешивается только
 *    после запуска скрипта, а не лежит в разметке.
 */
export function Reveal({
  children, delay = 0,
}: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setShown(false)
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setShown(true)
        io.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal${shown ? ' on' : ''}`}
         style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}
