import type { Metadata } from 'next'
import { pageMeta } from '@/lib/meta'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { q } from '@/sanity/client'
import { ARTICLES } from '@/sanity/queries'
import { seedArticles } from '@/lib/seed'
import { dict, isLocale, type Locale } from '@/lib/i18n'
import type { Article } from '@/lib/types'
import styles from './page.module.css'

/**
 * МАТЕРИАЛЫ. Фестиваль — издающий: у него есть самиздат «К!», интервью
 * и шоукейсы. Поэтому это раздел, а не сноска в подвале.
 *
 * Статьи переводятся на уровне ДОКУМЕНТА (D-005): запрос фильтрует по языку,
 * а не достаёт поле. Английской версии может не быть вовсе — и это нормально.
 */
export const revalidate = 60

const KIND: Record<Article['kind'], { ru: string; en: string }> = {
  interview: { ru: 'Интервью', en: 'Interview' },
  essay: { ru: 'Текст', en: 'Essay' },
  showcase: { ru: 'Шоукейс', en: 'Showcase' },
  chronicle: { ru: 'Хроника', en: 'Chronicle' },
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : 'ru') as Locale
  return pageMeta({
    locale, path: '/materials',
    title: `${locale === 'ru' ? 'Материалы' : 'Materials'} — По-ту-сторонний`,
    description: locale === 'ru' ? 'Тексты, интервью и хроника фестиваля.' : 'Texts, interviews and chronicle.',
  })
}

export default async function Materials({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const d = dict[locale]

  const articles = await q<Article[]>(ARTICLES, { locale, limit: 24 }, seedArticles)

  return (
    <main className={styles.wrap}>
      <h1 className={`g ${styles.h1}`}>{d.materials}</h1>

      {articles.length === 0 ? (
        <p className={styles.empty}>
          {locale === 'ru'
            ? 'На этом языке материалов пока нет.'
            : 'Nothing published in English yet.'}
        </p>
      ) : (
        <div className={styles.grid}>
          {articles.map((a) => {
            const external = Boolean(a.externalUrl)
            const href = a.externalUrl ?? `/${locale}/materials/${a.slug}`
            const card = (
              <>
                <div className={`frame ${styles.cov}`}><div className="ph" /></div>
                <div className={styles.bd}>
                  <div className="k">
                    {KIND[a.kind][locale]}
                    {external && ' ↗'}
                  </div>
                  <h2 className={`g ${styles.title}`}>{a.title}</h2>
                  <div className={styles.when}>
                    {new Date(a.publishedAt).toLocaleDateString(locale, {
                      day: '2-digit', month: '2-digit', year: 'numeric',
                    })}
                  </div>
                </div>
              </>
            )
            // Внешние публикации живут в той же ленте — поле externalUrl в модели.
            return external ? (
              <a key={a._id} href={href} target="_blank" rel="noopener noreferrer"
                 className={`surface ${styles.mc}`}>{card}</a>
            ) : (
              <Link key={a._id} href={href} className={`surface ${styles.mc}`}>{card}</Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
