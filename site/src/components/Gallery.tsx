'use client'
import { useRef } from 'react'
import { urlFor } from '@/sanity/image'
import type { Img } from '@/lib/types'
import { B } from './B'
import styles from './Gallery.module.css'

/**
 * Галерея — горизонтальная лента с прокруткой, а не слайдшоу.
 *
 * Слайдшоу показывает по одному кадру и решает за зрителя, сколько
 * на него смотреть. Лента показывает, что снимков много, и отдаёт
 * темп просмотра ему. Для свидетельства о фестивале это вернее.
 *
 * Прокрутка родная: работает пальцем, колесом и с клавиатуры,
 * стрелки — только удобство поверх неё, а не единственный способ.
 */
export function Gallery({ shots, label }: { shots: Img[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <>
      <div ref={ref} className={styles.strip} tabIndex={0} aria-label={label}>
        {shots.map((im, i) => {
          const src = urlFor(im, 1200)
          if (!src) return null
          return (
            <figure key={i} className={styles.shot}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={im.alt ?? ''} loading="lazy" />
              {im.caption && <figcaption>{im.caption}</figcaption>}
            </figure>
          )
        })}
      </div>

      <div className={styles.nav}>
        <B sm onClick={() => scroll(-1)} aria-label="Назад"><span>←</span></B>
        <B sm onClick={() => scroll(1)} aria-label="Вперёд"><span>→</span></B>
      </div>
    </>
  )
}
