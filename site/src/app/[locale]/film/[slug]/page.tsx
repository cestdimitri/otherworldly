import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { q, qWithSource } from '@/sanity/client'
import { FILM_BY_SLUG, FILM_SLUGS, SCREENINGS_OF_FILM } from '@/sanity/queries'
import { seedFilms, seedScreenings } from '@/lib/seed'
import { dict, isLocale, locales, t, type Locale } from '@/lib/i18n'
import { now } from '@/lib/now'
import { pageMeta } from '@/lib/meta'
import { urlFor } from '@/sanity/image'
import type { Film, Screening } from '@/lib/types'
import { TicketButton } from '@/components/TicketButton'
import styles from './page.module.css'

/**
 * СТРАНИЦА ФИЛЬМА. Главный блок — «показы»: все сеансы этой работы
 * за историю фестиваля, включая прошедшие сезоны.
 *
 * Возможно только потому, что film и event разведены в модели (D-007).
 * До этой правки страница брала данные из СОБЫТИЯ и показывала ровно один
 * сеанс — то есть решение первого дня три недели ничего не давало.
 *
 * Прошедшие сеансы приглушены, но не спрятаны: они часть биографии работы,
 * и именно это отличает архив от кладбища.
 *
 * Носитель стоит у КАЖДОГО сеанса, а не у фильма: одна работа в 2025-м шла
 * с цифры, в 2026-м идёт с плёнки. Это свойство показа, а не произведения.
 */
export const revalidate = 60

export async function generateStaticParams() {
  const rows = await q<{ slug: string }[]>(
    FILM_SLUGS, {}, seedFilms.map((f) => ({ slug: f.slug })),
  )
  return locales.flatMap((locale) => rows.map((r) => ({ locale, slug: r.slug })))
}

async function get(slug: string) {
  const fb = seedFilms.find((f) => f.slug === slug) ?? null
  // Фильм и его сеансы — из одного источника: у демо-фильма идентификатор,
  // которого нет в базе, и биография работы оказалась бы пустой.
  const { data: film, fromSeed } = await qWithSource<Film | null>(FILM_BY_SLUG, { slug }, fb)
  if (!film) return { film: null, screenings: [] as Screening[] }
  const screenings = fromSeed
    ? seedScreenings[slug] ?? []
    : await q<Screening[]>(SCREENINGS_OF_FILM, { filmId: film._id }, [])
  return { film, screenings }
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = (isLocale(raw) ? raw : 'ru') as Locale
  const { film } = await get(slug)
  const title = film ? t(film.title, locale).text : ''
  return pageMeta({
    locale, path: `/film/${slug}`,
    title: title ? `${title} — По-ту-сторонний` : 'По-ту-сторонний',
    description: film ? t(film.synopsis, locale).text : '',
  })
}

export default async function FilmPage({
  params,
}: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const d = dict[locale]

  const { film, screenings } = await get(slug)
  if (!film) notFound()

  const title = t(film.title, locale)
  const synopsis = t(film.synopsis, locale)
  const today = now()
  const stillUrl = urlFor(film.still, 1600)

  const carrier = (f?: '16' | 'dig') =>
    f === '16' ? '16 мм' : locale === 'ru' ? 'Цифра' : 'Digital'

  // Ближайший непрошедший сеанс — единственное, что можно купить.
  const next = [...screenings].reverse().find((s) => new Date(s.startsAt) >= today)

  return (
    <main className={styles.wrap}>
      <div className={styles.head}>
        <div className={`frame ${styles.still}`}>
          {stillUrl
            ? /* eslint-disable-next-line @next/next/no-img-element */
              <img src={stillUrl} alt={film.still?.alt ?? ''} />
            : <div className="ph" />}
        </div>
        <div className={styles.rail}>
          {film.director && (
            <div>{locale === 'ru' ? 'Режиссёр' : 'Director'}<b>{film.director}</b></div>
          )}
          {(film.country || film.year) && (
            <div>{locale === 'ru' ? 'Страна / год' : 'Country / year'}
              <b>{[film.country, film.year].filter(Boolean).join(', ')}</b></div>
          )}
          {film.duration && (
            <div>{locale === 'ru' ? 'Хронометраж' : 'Duration'}
              <b>{film.duration} {d.min}</b></div>
          )}
          <div>{locale === 'ru' ? 'Показов' : 'Screenings'}<b>{screenings.length}</b></div>
        </div>
      </div>

      <div className={styles.title}>
        <h1 className={`g ${styles.h1}`} lang={title.lang}>{title.text}</h1>
        {film.originalTitle && film.originalTitle !== title.text && (
          <div className={styles.orig}>{film.originalTitle}</div>
        )}
      </div>

      {synopsis.text && (
        <p className={styles.syn} lang={synopsis.lang}>{synopsis.text}</p>
      )}

      <h2 className={`g ${styles.shead}`}>
        {locale === 'ru' ? 'Показы на фестивале' : 'Screenings'}
      </h2>

      <div className="stack">
        {screenings.map((s) => {
          const st = new Date(s.startsAt)
          const past = st < today
          const buyable = next?._id === s._id
          return (
            <div key={s._id} className={`surface ${styles.sc}${past ? ' ' + styles.past : ''}`}>
              <div className={`g ${styles.yr}`}>{s.edition.year}</div>
              <div>
                <div className="k">{d.strands[s.strand]}</div>
                <div className={styles.w}>
                  {st.toLocaleDateString(locale, { day: 'numeric', month: 'long' })}
                  <i>|</i>{st.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                  <i>|</i>{t(s.venue?.name, locale).text || '—'}
                  <i>|</i>{carrier(s.format).toLowerCase()}
                </div>
              </div>
              {past
                ? <span className={styles.arch}>{locale === 'ru' ? 'Архив' : 'Archive'}</span>
                : buyable
                  ? <TicketButton sm eventId={s.timepadEventId} label={d.tickets} soonLabel={d.soon} />
                  : <span className={styles.arch}>{locale === 'ru' ? 'Впереди' : 'Ahead'}</span>}
            </div>
          )
        })}
      </div>
    </main>
  )
}
