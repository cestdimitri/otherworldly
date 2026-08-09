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
    kinds: { interview: 'Интервью', essay: 'Текст', showcase: 'Шоукейс', chronicle: 'Хроника' },
    team: 'Кураторки', past: 'Прошлые сезоны', allMaterials: 'Все материалы',
    allSeasons: 'Весь архив',
    // Описание фестиваля. Постоянное — не привязано к сезону, поэтому
    // живёт здесь, а не в базе. В сезоне лежит его собственное заявление.
    intro: '«По-ту-сторонний» — фестиваль-лаборатория, где кино становится инструментом исследования. Мы соединяем теорию кино с практикой экспериментального кинематографа. Каждый сезон — новые тематические и метафорические векторы, которые развиваются вместе с режиссёрами, зрителями и кураторами',
    phases: { done: 'Завершено', now: 'Идёт сейчас', next: 'Впереди' },
  },
  en: {
    tickets: 'Tickets', programme: 'Programme', timetable: 'Timetable',
    lab: 'Laboratory', archive: 'Archive', materials: 'Materials', about: 'About',
    season: 'Season', soon: 'On sale soon', daysLeft: 'Festival in',
    days: 'days', projectorOn: 'Projector on', min: 'min',
    strands: { fest: 'Festival', lab: 'Laboratory', spec: 'Special', echo: 'Echo' },
    kinds: { interview: 'Interview', essay: 'Essay', showcase: 'Showcase', chronicle: 'Chronicle' },
    team: 'Curators', past: 'Past seasons', allMaterials: 'All materials',
    allSeasons: 'Full archive',
    intro: 'Otherworldly is a festival-laboratory where cinema becomes an instrument of research. We join film theory to the practice of experimental cinema. Each season brings new thematic and metaphorical vectors, developed together with directors, audiences and curators',
    phases: { done: 'Finished', now: 'Now', next: 'Ahead' },
  },
} as const
