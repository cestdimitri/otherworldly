import { q } from '@/sanity/client'
import { CURRENT_EDITION, EVENTS_BY_EDITION } from '@/sanity/queries'
import { seedEdition, seedEvents } from '@/lib/seed'
import { now } from '@/lib/now'
import { dict, isLocale, t, type Locale } from '@/lib/i18n'
import type { Edition, EventItem } from '@/lib/types'
import { TicketButton } from '@/components/TicketButton'
import { B } from '@/components/B'
import { notFound } from 'next/navigation'
import styles from './page.module.css'

/**
 * Главная — направление C, «лента»: сезон как вертикальная ось года.
 * Какая фаза подсвечена, обратный отсчёт и строка «проектор включится»
 * читаются из ОДНИХ И ТЕХ ЖЕ дат сезона (D-069). Между сезонами лента
 * не пустеет — она просто смещает подсветку.
 */
export const revalidate = 60

type Phase = {
  id: string; when: string; state: 'done' | 'now' | 'next' | 'ahead'
  title: string; text: string
}

function buildPhases(ed: Edition, locale: Locale, today: Date): Phase[] {
  const start = new Date(ed.startDate)
  const end = new Date(ed.endDate)
  const days = Math.ceil((start.getTime() - today.getTime()) / 86_400_000)
  const running = today >= start && today <= end
  const ru = locale === 'ru'

  return [
    { id: 'prep', when: ru ? 'Май — Июль' : 'May — July', state: 'done',
      title: ru ? 'Подготовка' : 'Preparation',
      text: ru ? 'Сбор кураторской команды, определение векторов сезона.'
               : 'Assembling the curatorial team, setting the season’s vectors.' },
    { id: 'call', when: ru ? 'до 15 августа' : 'until 15 August', state: 'now',
      title: ru ? 'Опен колл' : 'Open call',
      text: ru ? 'Принимаем экспериментальные работы любой длины и любого носителя.'
               : 'We accept experimental work of any length and any carrier.' },
    { id: 'lab', when: ru ? 'Июль — Сентябрь' : 'July — September', state: 'now',
      title: ru ? 'Лаборатория лиминального образа' : 'Laboratory of the Liminal Image',
      text: ru ? 'Два месяца чтения, показов и разбора.'
               : 'Two months of reading, screenings and analysis.' },
    { id: 'fest',
      when: `${start.getDate()} — ${end.getDate()} ${ru ? 'сентября' : 'September'}`,
      state: 'next',
      title: ru ? 'Фестиваль' : 'Festival',
      text: running
        ? (ru ? 'Идёт сейчас.' : 'Running now.')
        : `${dict[locale].daysLeft} ${days} ${dict[locale].days}` },
    { id: 'echo', when: ru ? 'Октябрь' : 'October', state: 'ahead',
      title: ru ? 'Эхо в других городах' : 'Echo in other cities',
      text: ru ? 'Избранные программы едут в Москву, Выборг и Калининград.'
               : 'Selected programmes travel to Moscow, Vyborg and Kaliningrad.' },
  ]
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const d = dict[locale]

  const edition = await q<Edition>(CURRENT_EDITION, {}, seedEdition)
  const events = await q<EventItem[]>(
    EVENTS_BY_EDITION, { editionId: edition._id }, seedEvents,
  )

  const phases = buildPhases(edition, locale, now())
  const days = events.slice(0, 4)
  const theme = t(edition.theme, locale)
  const statement = t(edition.statement, locale)

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.plate} aria-hidden />
        <div className={styles.beam} aria-hidden />
        <div className={styles.vig} aria-hidden />
        <div className={styles.heroIn}>
          <h1 className={`g ${styles.wordmark}`}>По-ту-сторонний</h1>
          <div className={`g ${styles.sub}`}>
            <span>{t(edition.title, locale).text} — «{theme.text}»</span>
            <i>|</i><span>17—20.09.{edition.year}</span>
            <i>|</i><span>{locale === 'ru' ? 'Санкт-Петербург' : 'St. Petersburg'}</span>
          </div>
          <p className={styles.lede} lang={statement.lang}>{statement.text}</p>
          <div className={styles.cta}>
            <B href={`/${locale}/timetable`}>{d.tickets}</B>
            <B href={`/${locale}/timetable`}>{d.timetable}</B>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={`g ${styles.shead}`}>{d.season}</h2>
        <div className={styles.tl}>
          {phases.map((p) => (
            <div key={p.id} className={`${styles.ph} ${styles[p.state]}`}>
              <div className={styles.when}>{p.when}</div>
              <div className={styles.mk} aria-hidden />
              <div>
                <div className={`k ${styles.state}`}>{p.text}</div>
                <h3 className={`g ${styles.phTitle}`}>{p.title}</h3>

                {p.id === 'fest' && (
                  <div className={`stack ${styles.days}`}>
                    {days.map((e) => {
                      const at = new Date(e.startsAt)
                      const title = t(e.title, locale)
                      return (
                        <div key={e._id} className={`surface ${styles.day}`}>
                          <div className={`g ${styles.n}`}>{at.getDate()}</div>
                          <div>
                            <div className="k">{d.strands[e.strand]}</div>
                            <div className={`g ${styles.dayTitle}`} lang={title.lang}>{title.text}</div>
                            <div className={styles.m}>
                              {t(e.venue?.name, locale).text}<i>|</i>
                              {at.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                              <i>|</i>{e.duration} {d.min}
                              {e.format === '16' && <><i>|</i>16 мм</>}
                            </div>
                          </div>
                          <TicketButton sm eventId={e.timepadEventId}
                            label={d.tickets} soonLabel={d.soon} />
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
