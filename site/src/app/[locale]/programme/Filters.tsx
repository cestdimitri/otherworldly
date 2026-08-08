'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { dict, t, type Locale } from '@/lib/i18n'
import type { EventItem, Strand } from '@/lib/types'
import { B } from '@/components/B'
import styles from './page.module.css'

type StrandFilter = Strand | 'all'
type FormatFilter = '16' | 'dig' | 'all'
type Sort = 'date' | 'title' | 'dur'

export function Filters({ locale, events }: { locale: Locale; events: EventItem[] }) {
  const d = dict[locale]
  const [strand, setStrand] = useState<StrandFilter>('all')
  const [format, setFormat] = useState<FormatFilter>('all')
  const [sort, setSort] = useState<Sort>('date')

  const list = useMemo(() => {
    const out = events.filter(
      (e) => (strand === 'all' || e.strand === strand) && (format === 'all' || e.format === format),
    )
    return out.sort((a, b) =>
      sort === 'title' ? t(a.title, locale).text.localeCompare(t(b.title, locale).text, locale)
      : sort === 'dur' ? b.duration - a.duration
      : a.startsAt.localeCompare(b.startsAt))
  }, [events, strand, format, sort, locale])

  const strands: StrandFilter[] = ['all', 'fest', 'lab', 'spec', 'echo']
  const formats: FormatFilter[] = ['all', '16', 'dig']
  const sorts: Sort[] = ['date', 'title', 'dur']
  const sortLabel: Record<Sort, string> =
    locale === 'ru' ? { date: 'По дате', title: 'По названию', dur: 'По длине' }
                    : { date: 'By date', title: 'By title', dur: 'By length' }
  const fmtLabel: Record<FormatFilter, string> =
    locale === 'ru' ? { all: 'Любой', '16': '16 мм', dig: 'Цифра' }
                    : { all: 'Any', '16': '16 mm', dig: 'Digital' }

  return (
    <>
      <div className={styles.bar}>
        {strands.map((s) => (
          <B key={s} sm aria-pressed={strand === s} onClick={() => setStrand(s)}>
            {s === 'all' ? (locale === 'ru' ? 'Все' : 'All') : d.strands[s]}
          </B>
        ))}
      </div>
      <div className={styles.bar}>
        {formats.map((f) => (
          <B key={f} sm aria-pressed={format === f} onClick={() => setFormat(f)}>{fmtLabel[f]}</B>
        ))}
        <span className={styles.sep} />
        {sorts.map((s) => (
          <B key={s} sm aria-pressed={sort === s} onClick={() => setSort(s)}>{sortLabel[s]}</B>
        ))}
      </div>

      <div className={styles.count}>
        {list.length} / {events.length}
      </div>

      {/* Пустое состояние объясняет, что делать, а не сообщает о пустоте:
          часть комбинаций фильтров даёт ноль результатов законно. */}
      {list.length === 0 ? (
        <p className={styles.empty}>
          {locale === 'ru'
            ? 'По выбранным фильтрам показов нет. Снимите один из них.'
            : 'Nothing matches these filters. Try removing one.'}
        </p>
      ) : (
        <div className="stack">
          {list.map((e) => {
            const title = t(e.title, locale)
            const at = new Date(e.startsAt)

            /**
             * Ссылка ведёт на ФИЛЬМ, и только если показывают ровно один.
             * Мастерская, питчинг и лекция — события без фильма, у них страницы
             * нет и быть не должно; программа шортов ведёт на несколько работ
             * сразу, и выбирать за зрителя одну из них неправильно.
             * Раньше сюда подставлялся слаг события — адрес существовал,
             * но открывал не то.
             */
            const only = e.films?.length === 1 ? e.films[0] : undefined
            const href = only ? `/${locale}/film/${only.slug}` : undefined
            const inner = (<>
                <div className={`frame ${styles.still}`}><div className="ph" /></div>
                <div className={styles.body}>
                  <div className="k">{d.strands[e.strand]}</div>
                  <h2 className={`g ${styles.title}`} lang={title.lang}>{title.text}</h2>
                  <div className={styles.cred}>
                    {t(e.venue?.name, locale).text || '—'}<i>|</i>{e.duration} {d.min}
                    {e.format === '16' && <><i>|</i>16 мм</>}
                  </div>
                </div>
                <div className={styles.when}>
                  <div className={`g ${styles.dnum}`}>
                    {at.getDate()}.0{at.getMonth() + 1}
                  </div>
                  <div className={styles.time}>
                    {at.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
            </>)

            return href ? (
              <Link key={e._id} href={href} className={`surface ${styles.it}`}>{inner}</Link>
            ) : (
              <div key={e._id} className={`surface ${styles.it} ${styles.flat}`}>{inner}</div>
            )
          })}
        </div>
      )}
    </>
  )
}
