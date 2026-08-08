import { dict, type Locale } from '@/lib/i18n'
import styles from './Footer.module.css'

/**
 * Подвал — не меню, а паспортная табличка объекта: пары «ключ / значение»
 * капсом, штрихкод, строка издания. Прижат к правому краю.
 */
export function Footer({ locale, year }: { locale: Locale; year: number }) {
  const ru = locale === 'ru'
  const rows: [string, string][] = [
    [ru ? 'Событие' : 'Event', 'По-ту-сторонний 3.0'],
    [ru ? 'Сезон' : 'Season', ru ? '03 / «Переход»' : '03 / “Transition”'],
    [ru ? 'Даты' : 'Dates', `17.09 — 20.09.${year}`],
    [ru ? 'Площадки' : 'Venues', ru ? 'Горка / Дом Радио' : 'Gorka / Radio House'],
    [ru ? 'Почта' : 'Email', 'otherworldlyfilmfestival@gmail.com'],
    [ru ? 'Телеграм' : 'Telegram', '@potustoronnii'],
    [ru ? 'Билеты' : 'Tickets', 'Timepad'],
  ]

  return (
    <footer className={styles.foot}>
      <div className={styles.plate}>
        <div className={styles.hd}>
          <span>Otherworldly</span>
          <span>{ru ? 'СПб / Ru' : 'SPb / En'}</span>
        </div>
        <div className={styles.rows}>
          {rows.map(([k, v]) => (
            <div key={k} className={styles.r}>
              <span className={styles.k}>{k}</span>
              <span className={styles.v}>{v}</span>
            </div>
          ))}
        </div>
        <div className={styles.bar} aria-hidden />
        <div className={styles.ft}>
          <span>{ru ? 'Изд. 03' : 'Ed. 03'}</span>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  )
}
