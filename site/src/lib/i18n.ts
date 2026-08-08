export const locales = ['ru', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'ru'
export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v)

/**
 * Откат на русский, если английского нет (D-006).
 * Возвращаем и текст, и фактический язык — чтобы поставить lang="ru"
 * на элемент и не сбить экранный диктор. Это решение про доступность,
 * а не про удобство.
 */
export function t(
  field: { ru?: string; en?: string } | undefined,
  locale: Locale,
): { text: string; lang: Locale } {
  if (!field) return { text: '', lang: locale }
  const wanted = field[locale]
  if (wanted) return { text: wanted, lang: locale }
  return { text: field.ru ?? '', lang: 'ru' }
}

export const dict = {
  ru: {
    tickets: 'Билеты', programme: 'Программа', timetable: 'Расписание',
    lab: 'Лаборатория', archive: 'Архив', materials: 'Материалы', about: 'О нас',
    season: 'Лента сезона', soon: 'Скоро в продаже', daysLeft: 'До фестиваля',
    days: 'дней', projectorOn: 'Проектор включится', min: 'мин',
    strands: { fest: 'Фестиваль', lab: 'Лаборатория', spec: 'Спецпрограмма', echo: 'Эхо' },
    phases: { done: 'Завершено', now: 'Идёт сейчас', next: 'Впереди' },
  },
  en: {
    tickets: 'Tickets', programme: 'Programme', timetable: 'Timetable',
    lab: 'Laboratory', archive: 'Archive', materials: 'Materials', about: 'About',
    season: 'Season', soon: 'On sale soon', daysLeft: 'Festival in',
    days: 'days', projectorOn: 'Projector on', min: 'min',
    strands: { fest: 'Festival', lab: 'Laboratory', spec: 'Special', echo: 'Echo' },
    phases: { done: 'Finished', now: 'Now', next: 'Ahead' },
  },
} as const
