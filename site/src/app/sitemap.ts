import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { SITE } from '@/lib/meta'
import { seedFilms, seedPages } from '@/lib/seed'

/**
 * Одна карта на оба языка — довод в пользу подпутей из D-003.
 * У поддоменов пришлось бы держать две.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/timetable', '/programme', '/materials', '/archive']
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
    // Слаги ФИЛЬМОВ, а не событий: маршрут /film принадлежит работе,
    // и одна работа с двумя сеансами — это один адрес, а не два.
    for (const f of seedFilms) {
      out.push({ url: `${SITE}/${locale}/film/${f.slug}`, priority: 0.5 })
    }
    for (const p of seedPages) {
      out.push({ url: `${SITE}/${locale}/${p.slug}`, priority: 0.6 })
    }
  }
  return out
}
