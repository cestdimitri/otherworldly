import type { Metadata } from 'next'
import { pageMeta } from '@/lib/meta'
import { notFound } from 'next/navigation'
import { q, qWithSource } from '@/sanity/client'
import { CURRENT_EDITION, EVENTS_BY_EDITION } from '@/sanity/queries'
import { seedEdition, seedEvents } from '@/lib/seed'
import { dict, isLocale, t, type Locale } from '@/lib/i18n'
import type { Edition, EventItem } from '@/lib/types'
import styles from './page.module.css'

/**
 * РАСПИСАНИЕ. Сетка пропорциональна времени: строка = 30 минут, событие
 * занимает столько строк, сколько идёт (D-091). Отсюда три следствия:
 * хронометраж читается как высота, накладки физически невозможно спрятать,
 * а пустота информативна — это окно между показами.
 *
 * Полоса обозначается ТОЛЬКО подписью (D-090). Цвет, толщина линейки и знак
 * на корешке были испробованы по очереди и убраны.
 */
export const revalidate = 60

const START = 12 * 60
const END = 23 * 60 + 30
const SLOTS = Math.round((END - START) / 30)

const minutes = (iso: string) => {
  const d = new Date(iso)
  return d.getHours() * 60 + d.getMinutes()
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : 'ru') as Locale
  return pageMeta({
    locale, path: '/timetable',
    title: `${locale === 'ru' ? 'Расписание' : 'Timetable'} — По-ту-сторонний`,
    description: locale === 'ru' ? 'Расписание показов и событий сезона.' : 'Screenings and events, by day and hour.',
  })
}

export default async function Timetable({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const d = dict[locale]

  // Сезон и его события — из одного источника. Смешивать нельзя: у демо-сезона
  // идентификатор, которого нет в базе, и запрос вернул бы пустую программу.
  const { data: edition, fromSeed } = await qWithSource<Edition>(
    CURRENT_EDITION, {}, seedEdition,
  )
  const events = fromSeed
    ? seedEvents
    : await q<EventItem[]>(EVENTS_BY_EDITION, { editionId: edition._id }, seedEvents)

  const start = new Date(edition.startDate)
  const dayCount =
    Math.round((new Date(edition.endDate).getTime() - start.getTime()) / 86_400_000) + 1
  const days = Array.from({ length: dayCount }, (_, i) => {
    const dt = new Date(start); dt.setDate(start.getDate() + i); return dt
  })

  const dayIndex = (iso: string) =>
    Math.round((new Date(iso).setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0)) / 86_400_000)

  return (
    <main className={styles.wrap}>
      <h1 className={`g ${styles.h1}`}>{d.timetable}</h1>
      <div className={styles.meta}>
        {t(edition.title, locale).text} <i>|</i> {events.length}{' '}
        {locale === 'ru' ? 'событий' : 'events'}
      </div>

      {/* Десктоп: сетка. Дни — колонки, получас — строка. */}
      <div className={styles.grid}
           style={{ gridTemplateRows: `auto repeat(${SLOTS}, 27px)` }}>
        <div className={styles.corner} />
        {days.map((dt) => (
          <div key={+dt} className={styles.hd}>
            {dt.toLocaleDateString(locale, { weekday: 'short' })}
            <b className="g">{dt.getDate()}</b>
          </div>
        ))}

        {/* Часовые полосы вместо линеек: полоса — поверхность, а не разделитель. */}
        {Array.from({ length: SLOTS }, (_, i) => {
          const m = START + i * 30
          if (m % 60) return null
          return (
            <div key={m} style={{ display: 'contents' }}>
              <div className={styles.tm} style={{ gridRow: i + 2 }}>
                {String(Math.floor(m / 60)).padStart(2, '0')}:00
              </div>
              <div className={styles.band} style={{ gridRow: `${i + 2} / span 2` }} />
            </div>
          )
        })}

        {events.map((e) => {
          const row = Math.round((minutes(e.startsAt) - START) / 30) + 2
          const span = Math.max(2, Math.round(e.duration / 30))
          const title = t(e.title, locale)
          const at = new Date(e.startsAt)
          return (
            <div key={e._id} className={`surface ${styles.ev}`}
                 style={{ gridColumn: dayIndex(e.startsAt) + 2, gridRow: `${row} / span ${span}` }}>
              <div className="k">{d.strands[e.strand]}</div>
              <div className={`g ${styles.evTitle}`} lang={title.lang}>{title.text}</div>
              <div className={styles.evMeta}>
                {at.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                <i>|</i>{t(e.venue?.name, locale).text || '—'}
                <i>|</i>{e.duration} {d.min}
              </div>
            </div>
          )
        })}
      </div>

      {/* Мобильные: список по дням. Не деградация, а другой ответ на другой вопрос —
          на телефоне спрашивают «что сегодня», а не «как устроена неделя» (D-094). */}
      <div className={styles.list}>
        {days.map((dt, i) => {
          const ofDay = events.filter((e) => dayIndex(e.startsAt) === i)
          if (!ofDay.length) return null
          return (
            <section key={+dt}>
              <h2 className={`g ${styles.dayhd}`}>
                {dt.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })}
              </h2>
              <div className="stack">
                {ofDay.map((e) => {
                  const title = t(e.title, locale)
                  const at = new Date(e.startsAt)
                  return (
                    <div key={e._id} className={`surface ${styles.row}`}>
                      <div className={styles.h}>
                        {at.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div>
                        <div className="k">{d.strands[e.strand]}</div>
                        <div className={`g ${styles.evTitle}`} lang={title.lang}>{title.text}</div>
                        <div className={styles.evMeta}>
                          {t(e.venue?.name, locale).text || '—'}<i>|</i>{e.duration} {d.min}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
