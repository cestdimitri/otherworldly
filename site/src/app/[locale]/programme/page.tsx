import type { Metadata } from 'next'
import { pageMeta } from '@/lib/meta'
import { notFound } from 'next/navigation'
import { q, qWithSource } from '@/sanity/client'
import { CURRENT_EDITION, EVENTS_BY_EDITION } from '@/sanity/queries'
import { seedEdition, seedEvents } from '@/lib/seed'
import { dict, isLocale, t, type Locale } from '@/lib/i18n'
import type { Edition, EventItem } from '@/lib/types'
import { Filters } from './Filters'
import styles from './page.module.css'

/**
 * ПРОГРАММА — второй вход в те же данные, что и расписание.
 * Расписание отвечает «что я успею в субботу», программа — «что вообще
 * показывают». Поэтому здесь нет времени как оси: сортировка и фильтры
 * идут по свойствам работы (полоса, носитель, длина).
 *
 * Данные тянутся на сервере, фильтрация — на клиенте: набор в пределах
 * сезона десятки записей, гонять их через сеть на каждый клик незачем.
 */
export const revalidate = 60

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : 'ru') as Locale
  return pageMeta({
    locale, path: '/programme',
    title: `${locale === 'ru' ? 'Программа' : 'Programme'} — По-ту-сторонний`,
    description: locale === 'ru' ? 'Фильмы и события сезона по полосам.' : 'Films and events of the season, by strand.',
  })
}

export default async function Programme({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const d = dict[locale]

  // Сезон и его события — из одного источника. Смешивать нельзя: у демо-сезона
  // идентификатор, которого нет в базе, и запрос вернул бы пустую программу.
  const { data: edition, fromSeed } = await qWithSource<Edition>(
    CURRENT_EDITION, {}, seedEdition,
  )
  const events = fromSeed
    ? seedEvents
    : await q<EventItem[]>(EVENTS_BY_EDITION, { editionId: edition._id }, seedEvents)

  return (
    <main className={styles.wrap}>
      <h1 className={`g ${styles.h1}`}>{d.programme}</h1>
      <div className={styles.meta}>
        {t(edition.title, locale).text} <i>|</i> {t(edition.theme, locale).text}
      </div>
      <Filters locale={locale} events={events} />
    </main>
  )
}
