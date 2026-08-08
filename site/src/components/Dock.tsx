'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { B } from './B'
import { dict, type Locale } from '@/lib/i18n'

/** Плавающая стеклянная панель. Единственное место со скруглениями. */
export type NavPage = { slug: string; label: string; order: number }

export function Dock({ locale, pages = [] }: { locale: Locale; pages?: NavPage[] }) {
  const d = dict[locale]
  const path = usePathname()
  const [away, setAway] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const y = window.scrollY
      if (!open) setAway(y > 160 && y > last)
      last = y
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => removeEventListener('keydown', onKey)
  }, [open])

  const other: Locale = locale === 'ru' ? 'en' : 'ru'
  // Переключатель ведёт на ЭКВИВАЛЕНТНУЮ страницу, а не на главную (D-003).
  const swapped = path.replace(new RegExp(`^/${locale}`), `/${other}`)

  /**
   * Меню собирается из двух источников: разделы, у которых есть код, и гибкие
   * страницы из CMS. Порядок общий и числовой, поэтому кураторка может
   * поставить «опен-колл» ПЕРЕД расписанием, не трогая репозиторий, — иначе
   * пункты из CMS вечно оказывались бы приклеены в хвост.
   *
   * Обрезано пятью пунктами: панель узкая, и шестой начнёт её ломать раньше,
   * чем кто-нибудь это заметит на бою.
   */
  const built: NavPage[] = [
    { slug: 'timetable', label: d.timetable, order: 20 },
    { slug: 'programme', label: d.programme, order: 25 },
    { slug: 'materials', label: d.materials, order: 30 },
    { slug: 'archive', label: d.archive, order: 35 },
  ]
  const nav = [...built, ...pages]
    .sort((a, b) => a.order - b.order)
    .slice(0, 5)
    .map((i) => [`/${locale}/${i.slug}`, i.label] as const)

  return (
    <>
      <header className={`dock${away ? ' away' : ''}`}>
        <button
          className="burger" aria-expanded={open} aria-controls="menu" aria-label="Menu"
          onClick={() => setOpen(!open)}
        ><i /><i /><i /></button>

        <nav>
          {nav.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>

        <div className="sp">
          <div className="lang">
            <Link href={swapped} aria-current={undefined}>{other.toUpperCase()}</Link>
          </div>
          <B sm href={`/${locale}/timetable`}>{d.tickets}</B>
        </div>
      </header>

      <div className={`menu${open ? ' on' : ''}`} id="menu">
        {nav.map(([href, label]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
        ))}
      </div>
    </>
  )
}
