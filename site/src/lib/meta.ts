import type { Metadata } from 'next'
import { locales, type Locale } from './i18n'

/**
 * Базовый адрес. Нужен для абсолютных ссылок в hreflang, og и карте сайта —
 * относительные там не работают.
 */
export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://otherworldly.example'

/**
 * hreflang. Заявлен в D-003 как довод в пользу подпутей вместо поддоменов,
 * но до этого места существовал только на бумаге.
 *
 * x-default ведёт на русскую версию: фестиваль петербургский, и для человека
 * с неизвестным языком это более осмысленный вход, чем английский.
 */
export function pageMeta({
  locale, path, title, description,
}: {
  locale: Locale
  path: string            // без локали, например '/timetable'
  title: string
  description?: string
}): Metadata {
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${SITE}/${l}${path}`]),
  ) as Record<Locale, string>

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/${locale}${path}`,
      languages: { ...languages, 'x-default': `${SITE}/ru${path}` },
    },
    openGraph: {
      title,
      description,
      url: `${SITE}/${locale}${path}`,
      siteName: 'По-ту-сторонний',
      locale: locale === 'ru' ? 'ru_RU' : 'en_GB',
      alternateLocale: locale === 'ru' ? 'en_GB' : 'ru_RU',
      type: 'website',
    },
  }
}
