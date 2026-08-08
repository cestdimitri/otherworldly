import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Body } from '@/components/Body'
import { isLocale, locales, t, type Locale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import { seedPages } from '@/lib/seed'
import type { Page } from '@/lib/types'
import { q } from '@/sanity/client'
import { PAGE_BY_SLUG, PAGE_SLUGS } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import styles from './page.module.css'

/**
 * ГИБКАЯ СТРАНИЦА.
 *
 * Один маршрут на все разделы, которые кураторка заведёт сама: «о фестивале»,
 * «опен-колл», «контакты». Статические сегменты — timetable, programme,
 * materials, archive — разбираются раньше динамического, поэтому этот маршрут
 * их не перехватывает; он ловит только то, чего в коде нет.
 *
 * Это и есть та часть требования «CMS», которую нельзя подделать генератором
 * статики: новый раздел появляется без сборки и без разработчика.
 */
export const revalidate = 300

export async function generateStaticParams() {
  const rows = await q<{ slug: string }[]>(
    PAGE_SLUGS, {}, seedPages.map((p) => ({ slug: p.slug })),
  )
  return locales.flatMap((locale) => rows.map((r) => ({ locale, slug: r.slug })))
}

async function get(slug: string) {
  const fb = seedPages.find((p) => p.slug === slug) ?? null
  return q<Page | null>(PAGE_BY_SLUG, { slug }, fb)
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = (isLocale(raw) ? raw : 'ru') as Locale
  const page = await get(slug)
  const title = page ? t(page.title, locale).text : ''
  return pageMeta({
    locale, path: `/${slug}`,
    title: title ? `${title} — По-ту-сторонний` : 'По-ту-сторонний',
    description: page ? t(page.lead, locale).text : '',
  })
}

export default async function FlexPage({
  params,
}: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale

  const page = await get(slug)
  if (!page) notFound()

  // Откат EN→RU возвращает и текст, и язык, которым он написан (D-006):
  // без пометки экранный диктор прочтёт русский с английской фонетикой.
  const title = t(page.title, locale)
  const lead = t(page.lead, locale)
  const coverUrl = urlFor(page.cover, 1600)
  const hasBlocks = Array.isArray(page.blocks) && page.blocks.length > 0

  return (
    <main className={styles.wrap}>
      <h1 className={`g ${styles.h1}`} lang={title.lang}>{title.text}</h1>

      {lead.text && (
        <p className={styles.lead} lang={lead.lang}>{lead.text}</p>
      )}

      {coverUrl && (
        <div className={`frame ${styles.cover}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverUrl} alt={page.cover?.alt ?? ''} />
        </div>
      )}

      {hasBlocks && (
        <div className={styles.body}><Body value={page.blocks} /></div>
      )}
    </main>
  )
}
