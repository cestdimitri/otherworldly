import { notFound } from 'next/navigation'
import { q } from '@/sanity/client'
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

export default async function Programme({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const d = dict[locale]

  const edition = await q<Edition>(CURRENT_EDITION, {}, seedEdition)
  const events = await q<EventItem[]>(EVENTS_BY_EDITION, { editionId: edition._id }, seedEvents)

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
