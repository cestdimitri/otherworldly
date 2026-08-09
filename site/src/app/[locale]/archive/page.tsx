import type { Metadata } from 'next'
import { pageMeta } from '@/lib/meta'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { q } from '@/sanity/client'
import { groq } from 'next-sanity'
import { seedArchive } from '@/lib/seed'
import { dict, isLocale, t, type Locale } from '@/lib/i18n'
import type { Edition } from '@/lib/types'
import styles from './page.module.css'

/**
 * АРХИВ. Сезон — документ, а не страница (D-011): 2027-й будет новой записью.
 * Здесь у правила «свечение помечает живое» обратная сторона: в архиве
 * не светится ничего, кроме карточки текущего сезона.
 */
export const revalidate = 300

const ALL_EDITIONS = groq`
*[_type=="edition"] | order(year desc){
  _id, year, title, theme, startDate, endDate, status, vectors, cities
}`

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : 'ru') as Locale
  return pageMeta({
    locale, path: '/archive',
    title: `${locale === 'ru' ? 'Архив' : 'Archive'} — По-ту-сторонний`,
    description: locale === 'ru' ? 'Прошедшие сезоны фестиваля.' : 'Past seasons of the festival.',
  })
}

export default async function Archive({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const d = dict[locale]

  const editions = await q<Edition[]>(ALL_EDITIONS, {}, seedArchive)

  return (
    <main className={styles.wrap} data-mode="archive">
      <h1 className={`g ${styles.h1}`}>{d.archive}</h1>
      {editions.length === 0 && (
        <p className={styles.empty}>
          {locale === 'ru'
            ? 'Сезонов пока нет. Они появятся, когда их заведут в админке.'
            : 'No seasons yet. They appear once they are added in the studio.'}
        </p>
      )}

      <div className="stack" style={{ marginTop: 44 }}>
        {editions.map((e) => {
          const live = e.status === 'current'
          const title = t(e.title, locale)
          return (
            <Link key={e._id} href={`/${locale}/archive/${e.year}`}
                  className={`surface ${styles.ed}${live ? ' ' + styles.live : ''}`}>
              <div className={`g ${styles.yr}`}>{e.year}</div>
              <div>
                <div className="k">
                  {live ? d.phases.now : locale === 'ru' ? 'Сезон закрыт' : 'Season closed'}
                </div>
                <h2 className={`g ${styles.title}`} lang={title.lang}>{title.text}</h2>
                <div className={styles.vec}>{t(e.theme, locale).text}</div>
                {e.cities?.length ? <div className={styles.cities}>{e.cities.join(' · ')}</div> : null}
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
