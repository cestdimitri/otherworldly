import { notFound } from 'next/navigation'
import { q, qWithSource } from '@/sanity/client'
import { groq } from 'next-sanity'
import { seedArchive, seedEvents } from '@/lib/seed'
import { dict, isLocale, locales, t, type Locale } from '@/lib/i18n'
import type { Edition, EventItem } from '@/lib/types'
import styles from './page.module.css'

/**
 * СЕЗОН В АРХИВЕ. Правило «свечение помечает живое» проверяется здесь
 * отсутствием: закрытый сезон не светится вообще. Нет текущей фазы,
 * нет ближайшего события, покупать нечего — и интерфейс это признаёт
 * меткой «Архив» вместо кнопки, которая ничего не сделает.
 *
 * data-mode="archive" — задокументированный вариант токенов из
 * дизайн-системы, а не правка по месту.
 */
export const revalidate = 300

const ALL_YEARS = groq`*[_type=="edition" && defined(year)]{ year }`

export async function generateStaticParams() {
  const rows = await q<{ year: number }[]>(
    ALL_YEARS, {}, seedArchive.map((e) => ({ year: e.year })),
  )
  return locales.flatMap((locale) => rows.map((r) => ({ locale, year: String(r.year) })))
}

const EDITION_BY_YEAR = groq`
*[_type=="edition" && year==$year][0]{
  _id, year, title, theme, startDate, endDate, status, vectors, cities, statement
}`

export default async function EditionPage({
  params,
}: { params: Promise<{ locale: string; year: string }> }) {
  const { locale: raw, year } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const d = dict[locale]

  // Откат ищет ЗАПРОШЕННЫЙ год, а не отдаёт текущий сезон вслепую:
  // иначе /archive/2025 в пустой базе показал бы содержимое 2026-го,
  // то есть соврал бы уверенно и незаметно.
  const { data: edition, fromSeed } = await qWithSource<Edition | null>(
    EDITION_BY_YEAR, { year: Number(year) },
    seedArchive.find((e) => e.year === Number(year)) ?? null,
  )
  if (!edition) notFound()

  const events = fromSeed
    ? seedEvents
    : await q<EventItem[]>(
        groq`*[_type=="event" && edition._ref==$id] | order(startsAt asc){
          _id, slug, title, strand, startsAt, duration, format, venue->{name}
        }`, { id: edition._id }, seedEvents)

  const closed = edition.status === 'archived'
  const title = t(edition.title, locale)
  const statement = t(edition.statement, locale)

  return (
    <main className={styles.wrap} data-mode={closed ? 'archive' : undefined}>
      <div className="k">
        {closed ? (locale === 'ru' ? 'Сезон закрыт' : 'Season closed') : d.phases.now}
      </div>
      <div className={styles.masthead}>
        <div className={`g ${styles.yr}`}>{edition.year}</div>
        <div>
          <h1 className={`g ${styles.h1}`} lang={title.lang}>{title.text}</h1>
          <div className={styles.vec}>{t(edition.theme, locale).text}</div>
          {edition.cities?.length
            ? <div className={styles.cities}>{edition.cities.join(' · ')}</div> : null}
        </div>
      </div>

      {statement.text && (
        <p className={styles.stmt} lang={statement.lang}>{statement.text}</p>
      )}

      <h2 className={`g ${styles.shead}`}>
        {locale === 'ru' ? 'Программа сезона' : 'Programme'}
        <span>{events.length}</span>
      </h2>
      <div className="stack">
        {events.map((e) => {
          const t2 = t(e.title, locale)
          const at = new Date(e.startsAt)
          return (
            <div key={e._id} className={`surface ${styles.row}`}>
              <div className={styles.d}>
                {at.toLocaleDateString(locale, { day: '2-digit', month: '2-digit' })}
                {' · '}
                {at.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div>
                <div className="k">{d.strands[e.strand]}</div>
                <div className={`g ${styles.t}`} lang={t2.lang}>{t2.text}</div>
                <div className={styles.c}>
                  {t(e.venue?.name, locale).text || '—'}<i>|</i>{e.duration} {d.min}
                </div>
              </div>
              {/* Купить нечего — вместо кнопки метка состояния */}
              {closed && (
                <span className={styles.arch}>{locale === 'ru' ? 'Архив' : 'Archive'}</span>
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}
