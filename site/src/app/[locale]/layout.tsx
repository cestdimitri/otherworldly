import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Dock, type NavPage } from '@/components/Dock'
import { Footer } from '@/components/Footer'
import { isLocale, locales, t, type Locale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import { now } from '@/lib/now'
import { seedPages } from '@/lib/seed'
import type { Page } from '@/lib/types'
import { q } from '@/sanity/client'
import { NAV_PAGES } from '@/sanity/queries'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/** lang на <html> и hreflang задаются здесь — иначе двуязычность только в URL. */
export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : 'ru') as Locale
  return pageMeta({
    locale, path: '',
    title: 'По-ту-сторонний',
    description: locale === 'ru'
      ? 'Независимый международный кинофестиваль-лаборатория, Санкт-Петербург'
      : 'Independent international film festival-laboratory, St. Petersburg',
  })
}

export default async function LocaleLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale

  const rows = await q<Page[]>(NAV_PAGES, {}, seedPages)
  const pages: NavPage[] = rows.map((p) => ({
    slug: p.slug,
    label: t(p.title, locale).text,
    order: p.navOrder ?? 99,
  }))

  return (
    <>
      <Dock locale={locale} pages={pages} />
      {children}
      <Footer locale={locale} year={now().getFullYear()} />
    </>
  )
}
