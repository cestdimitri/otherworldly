import Link from 'next/link'
import { dict, type Locale } from '@/lib/i18n'
import { ToTop } from './ToTop'
import styles from './Footer.module.css'

/**
 * Подвал: во всю ширину, без лишнего.
 * Заменил прежнюю «техническую наклейку» — она отвлекала сильнее, чем сообщала.
 */
export function Footer({ locale, year }: { locale: Locale; year: number }) {
  const d = dict[locale]
  const ru = locale === 'ru'

  const links: [string, string][] = [
    [`/${locale}/timetable`, d.timetable],
    [`/${locale}/programme`, d.programme],
    [`/${locale}/materials`, d.materials],
    [`/${locale}/archive`, d.archive],
  ]

  return (
    <footer className={styles.f}>
      <div className={styles.in}>
        <div className={styles.left}>
          <Link href={`/${locale}`} className={`g ${styles.mark}`}>По-ту-сторонний</Link>
          <div className={styles.note}>
            {ru ? 'Независимый международный кинофестиваль-лаборатория'
                : 'Independent international film festival-laboratory'}
            <br />
            {ru ? 'Санкт-Петербург' : 'St. Petersburg'}
          </div>
        </div>

        <nav className={styles.nav}>
          {links.map(([href, label]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>

        <ToTop label={ru ? 'Наверх' : 'Top'} />
      </div>

      <div className={styles.base}>
        <span>© {year} По-ту-сторонний</span>
        <span>{ru ? 'Все права защищены' : 'All rights reserved'}</span>
      </div>
    </footer>
  )
}
