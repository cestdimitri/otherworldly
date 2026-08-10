import Link from 'next/link'
import { dict, type Locale } from '@/lib/i18n'
import { ToTop } from './ToTop'
import styles from './Footer.module.css'

/**
 * Подвал: во всю ширину контента, без лишнего.
 * Три колонки — разделы, авторство, контакты.
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

        <nav className={styles.nav} aria-label={ru ? 'Разделы' : 'Sections'}>
          {links.map(([href, label]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>

        <div className={styles.col}>
          <div className={styles.ch}>{ru ? 'Фото на сайте' : 'Photography'}</div>
          <div className={styles.names}>
            Ира Ломакина<br />Елиза Тимофеева<br />Полина Трубицына
          </div>

          <div className={`${styles.ch} ${styles.chGap}`}>
            {ru ? 'Разработка сайта' : 'Website'}
          </div>
          <div className={styles.names}>
            <a href="https://cestdimitri.github.io/" target="_blank" rel="noopener noreferrer">
              Дима Андреенко
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.ch}>{ru ? 'Контакты' : 'Contacts'}</div>
          <div className={styles.names}>
            <a href="https://t.me/potustoronnii" target="_blank" rel="noopener noreferrer">
              Telegram
            </a><br />
            <a href="https://www.instagram.com/otherworldly_festival?igsh=cXJ4cTlkYjFwZmpw"
               target="_blank" rel="noopener noreferrer">
              Instagram
            </a><br />
            <a href="mailto:otherworldlyfilmfestival@gmail.com">
              otherworldlyfilmfestival@gmail.com
            </a>
          </div>
        </div>

        <ToTop label={ru ? 'Наверх' : 'Top'} />
      </div>

      <div className={styles.base}>
        <span>© {year} По-ту-сторонний</span>
        <span>{ru ? 'Все права защищены' : 'All rights reserved'}</span>
      </div>
    </footer>
  )
}
