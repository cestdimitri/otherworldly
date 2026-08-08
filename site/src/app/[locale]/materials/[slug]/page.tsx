import { notFound } from 'next/navigation'
import { q } from '@/sanity/client'
import { groq } from 'next-sanity'
import { Body } from '@/components/Body'
import { seedArticles } from '@/lib/seed'
import { isLocale, locales, type Locale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import { urlFor } from '@/sanity/image'
import type { Article } from '@/lib/types'
import type { Metadata } from 'next'
import styles from './page.module.css'

/**
 * МАТЕРИАЛ. Единственная страница, где текст — предмет, а не подпись:
 * мера 64 знака, выключка по формату, переносы. Ниже 900px выключка
 * отключается — при мере меньше 45 знаков она разваливается в любом языке.
 */
export const revalidate = 300

const ARTICLE_BY_SLUG = groq`
*[_type=="article" && slug.current==$slug && language==$locale][0]{
  _id, "slug": slug.current, language, title, kind, dek, publishedAt, externalUrl,
  cover, body, author->{name}
}`

const ARTICLE_SLUGS = groq`*[_type=="article" && defined(slug.current)]{
  "slug": slug.current, language
}`

/**
 * Материалы переведены на документный уровень (D-005), поэтому у слага есть
 * свой язык — собирать каждый слаг под обе локали было бы неверно.
 */
export async function generateStaticParams() {
  const rows = await q<{ slug: string; language: Locale }[]>(
    ARTICLE_SLUGS, {},
    seedArticles.map((a) => ({ slug: a.slug, language: a.language })),
  )
  return rows
    .filter((r) => locales.includes(r.language))
    .map((r) => ({ locale: r.language, slug: r.slug }))
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = (isLocale(raw) ? raw : 'ru') as Locale
  const fb = seedArticles.find((a) => a.slug === slug) ?? null
  const a = await q<Article | null>(ARTICLE_BY_SLUG, { slug, locale }, fb)
  return pageMeta({
    locale, path: `/materials/${slug}`,
    title: a ? `${a.title} — По-ту-сторонний` : 'По-ту-сторонний',
    description: a?.dek ?? '',
  })
}

export default async function ArticlePage({
  params,
}: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale

  const fallback = seedArticles.find((a) => a.slug === slug) ?? null
  const article = await q<Article | null>(ARTICLE_BY_SLUG, { slug, locale }, fallback)
  if (!article) notFound()

  const coverUrl = urlFor(article.cover, 1600)
  const hasBody = Array.isArray(article.body) && article.body.length > 0

  const kind: Record<Article['kind'], { ru: string; en: string }> = {
    interview: { ru: 'Интервью', en: 'Interview' },
    essay: { ru: 'Текст', en: 'Essay' },
    showcase: { ru: 'Шоукейс', en: 'Showcase' },
    chronicle: { ru: 'Хроника', en: 'Chronicle' },
  }

  return (
    <main className={styles.wrap}>
      <div className="k">{kind[article.kind][locale]}</div>
      <h1 className={`g ${styles.h1}`}>{article.title}</h1>
      {article.dek && <p className={styles.dek}>{article.dek}</p>}
      <div className={styles.byline}>
        {new Date(article.publishedAt).toLocaleDateString(locale, {
          day: '2-digit', month: '2-digit', year: 'numeric',
        })}
      </div>

      <div className={`frame ${styles.cover}`}>
        {coverUrl
          ? /* eslint-disable-next-line @next/next/no-img-element */
            <img src={coverUrl} alt={article.cover?.alt ?? ''} />
          : <div className="ph" />}
      </div>

      <article className={styles.body}>
        {hasBody ? (
          <Body value={article.body} />
        ) : (
          <p className={styles.lead}>
            {locale === 'ru'
              ? 'Текст материала хранится в Sanity как Portable Text и подключается на этом месте.'
              : 'The article body is stored in Sanity as Portable Text and renders here.'}
          </p>
        )}
      </article>
    </main>
  )
}
