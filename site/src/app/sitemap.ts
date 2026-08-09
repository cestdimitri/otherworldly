import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { SITE } from '@/lib/meta'
import { seedFilms, seedPages } from '@/lib/seed'
import { q } from '@/sanity/client'
import { FILM_SLUGS, PAGE_SLUGS } from '@/sanity/queries'

/**
 * Одна карта на оба языка — довод в пользу подпутей из D-003.
 * У поддоменов пришлось бы держать две.
 *
 * Слаги берутся ИЗ БАЗЫ, а не из демо-данных. Первая версия перечисляла
 * seedFilms и seedPages, то есть отдавала поисковику выдуманные адреса:
 * на живом проекте четыре из восемнадцати ссылок вели в 404. Ошибка тихая —
 * в браузере сайт при этом безупречен.
 */
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = ['', '/timetable', '/programme', '/materials', '/archive']

  const [films, pages] = await Promise.all([
    q<{ slug: string }[]>(FILM_SLUGS, {}, seedFilms.map((f) => ({ slug: f.slug }))),
    q<{ slug: string }[]>(PAGE_SLUGS, {}, seedPages.map((p) => ({ slug: p.slug }))),
  ])

  const out: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const p of paths) {
      out.push({
        url: `${SITE}/${locale}${p}`,
        changeFrequency: p === '' ? 'daily' : 'weekly',
        priority: p === '' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${SITE}/${l}${p}`])),
        },
      })
    }
    for (const f of films) {
      out.push({ url: `${SITE}/${locale}/film/${f.slug}`, priority: 0.5 })
    }
    for (const p of pages) {
      out.push({ url: `${SITE}/${locale}/${p.slug}`, priority: 0.6 })
    }
  }
  return out
}
