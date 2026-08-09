import type { Article, Edition, EventItem, Film, Page, Screening } from './types'

/**
 * Демо-данные. Форма ровно та же, что вернёт GROQ-запрос, — поэтому
 * подключение Sanity не потребует переписывать компоненты.
 * Нужны для того, чтобы репозиторий запускался сразу после npm install:
 * показать работу без раздачи ключей иначе невозможно.
 */
export const seedEdition: Edition = {
  _id: 'seed-2026', year: 2026,
  title: { ru: 'Сезон 03', en: 'Season 03' },
  theme: { ru: 'Переход', en: 'Transition' },
  startDate: '2026-09-17', endDate: '2026-09-20',
  status: 'current',
  vectors: ['переход', 'носитель', 'порог'],
  cities: ['Санкт-Петербург'],
  statement: {
    ru: 'Фестиваль-лаборатория, где кино становится инструментом исследования. Третий сезон — о переходе: между состояниями, между носителями, между этой стороной и той.',
    en: 'A festival-laboratory where cinema is a research instrument. The third season is about transition: between states, between carriers, between this side and the other.',
  },
}

const v = (ru: string, en: string) => ({ _id: 'v-' + ru, name: { ru, en } })
const gorka = v('Горка', 'Gorka')
const radio = v('Дом Радио', 'Radio House')

/**
 * Фильмы и их сеансы — отдельно от событий, потому что отдельно в модели.
 *
 * «Нож в сердце Европы» намеренно показан дважды и в разных сезонах: без
 * второго сезона в демо-данных страница фильма выглядит так, будто разделение
 * film/event ничего не даёт, — а оно и есть главный довод архива. Носитель
 * у сеансов разный: в 2025-м работа шла с цифры, в 2026-м идёт с плёнки.
 */
export const seedFilms: Film[] = [
  { _id: 'f1', slug: 'nozh-v-serdce-evropy', year: 2025, duration: 82,
    title: { ru: 'Нож в сердце Европы', en: 'A Knife in the Heart of Europe' },
    originalTitle: 'A Knife in the Heart of Europe',
    director: 'Анна Цирлина', country: 'Россия',
    synopsis: {
      ru: 'Работа с архивной плёнкой как с материалом памяти. Изображение проявляется и исчезает, оставляя след там, где сюжет уже невозможен.',
      en: 'Archival film treated as the material of memory. The image develops and vanishes, leaving a trace where narrative is no longer possible.',
    } },
  { _id: 'f2', slug: 'liniya', year: 2026, duration: 64,
    title: { ru: 'Линия', en: 'The Line' }, director: 'Мария Гуськова', country: 'Россия',
    synopsis: { ru: 'Один кадр, разрезанный надвое движением камеры.',
                en: 'A single shot cut in two by a camera move.' } },
]

export const seedScreenings: Record<string, Screening[]> = {
  'nozh-v-serdce-evropy': [
    { _id: 's1', startsAt: '2026-09-17T19:00:00+03:00', format: '16', strand: 'fest',
      timepadEventId: '', venue: gorka,
      edition: { year: 2026, title: { ru: 'Сезон 03', en: 'Season 03' }, status: 'current' } },
    { _id: 's2', startsAt: '2025-09-20T18:00:00+03:00', format: 'dig', strand: 'echo',
      venue: radio,
      edition: { year: 2025, title: { ru: 'Сезон 02', en: 'Season 02' }, status: 'archived' } },
  ],
  liniya: [
    { _id: 's3', startsAt: '2026-09-18T20:00:00+03:00', format: '16', strand: 'fest',
      timepadEventId: '', venue: gorka,
      edition: { year: 2026, title: { ru: 'Сезон 03', en: 'Season 03' }, status: 'current' } },
  ],
}

export const seedEvents: EventItem[] = [
  { _id: 'e1', slug: 'otkrytie', strand: 'fest', startsAt: '2026-09-17T19:00:00+03:00',
    duration: 82, format: '16', venue: gorka, timepadEventId: '',
    films: [seedFilms[0]],
    title: { ru: 'Открытие / Нож в сердце Европы', en: 'Opening / A Knife in the Heart of Europe' } },
  { _id: 'e2', slug: 'razgovor', strand: 'spec', startsAt: '2026-09-17T21:30:00+03:00',
    duration: 64, format: 'dig', venue: gorka,
    title: { ru: 'Разговор с режиссёром', en: 'A conversation with the director' } },
  { _id: 'e3', slug: 'reading', strand: 'lab', startsAt: '2026-09-18T14:00:00+03:00',
    duration: 120, format: 'dig', venue: radio,
    title: { ru: 'Ридинг-группа / лиминальный образ', en: 'Reading group / the liminal image' } },
  { _id: 'e4', slug: 'po-tu-storonu', strand: 'fest', startsAt: '2026-09-18T17:00:00+03:00',
    duration: 94, format: '16', venue: gorka, timepadEventId: '',
    title: { ru: 'Кураторская программа «По ту сторону»', en: 'Curated programme “The Other Side”' } },
  { _id: 'e5', slug: 'liniya', strand: 'fest', startsAt: '2026-09-18T20:00:00+03:00',
    duration: 110, format: '16', venue: gorka, films: [seedFilms[1]],
    title: { ru: 'Линия отражения', en: 'The Line of Reflection' } },
  { _id: 'e6', slug: 'masterskaya', strand: 'spec', startsAt: '2026-09-19T12:30:00+03:00',
    duration: 180, format: '16', venue: gorka,
    title: { ru: 'Мастерская 16 мм', en: '16 mm workshop' } },
  { _id: 'e7', slug: 'projects', strand: 'lab', startsAt: '2026-09-19T16:00:00+03:00',
    duration: 120, format: 'dig', venue: radio,
    title: { ru: 'Показ проектов участников', en: 'Participants’ projects' } },
  { _id: 'e8', slug: 'vokrug', strand: 'fest', startsAt: '2026-09-19T19:00:00+03:00',
    duration: 68, format: 'dig', venue: gorka,
    title: { ru: 'Вокруг да около', en: 'Round About' } },
  { _id: 'e9', slug: 'echo-klg', strand: 'echo', startsAt: '2026-09-19T21:00:00+03:00',
    duration: 76, format: 'dig',
    title: { ru: 'Эхо / Калининград', en: 'Echo / Kaliningrad' } },
  { _id: 'e10', slug: 'echo-msk', strand: 'echo', startsAt: '2026-09-20T14:00:00+03:00',
    duration: 76, format: 'dig',
    title: { ru: 'Эхо / Москва', en: 'Echo / Moscow' } },
  { _id: 'e11', slug: 'special', strand: 'spec', startsAt: '2026-09-20T17:00:00+03:00',
    duration: 94, format: 'dig', venue: gorka,
    title: { ru: 'Специальная программа', en: 'Special programme' } },
  { _id: 'e12', slug: 'zakrytie', strand: 'fest', startsAt: '2026-09-20T19:30:00+03:00',
    duration: 110, format: '16', venue: gorka, timepadEventId: '',
    title: { ru: 'Закрытие / Нейрометаморфозы', en: 'Closing / Neurometamorphoses' } },
]

export const seedArticles: Article[] = [
  { _id: 'a1', slug: 'plenka-pomnit', language: 'ru', kind: 'interview',
    title: '«Плёнка помнит дольше, чем мы» — разговор с Анной Цирлиной',
    publishedAt: '2026-07-28' },
  { _id: 'a2', slug: 'hauntology', language: 'ru', kind: 'essay',
    title: 'Хонтология и кинематограф: что остаётся, когда изображение уходит',
    publishedAt: '2026-07-14' },
  { _id: 'a3', slug: 'pyat-rabot', language: 'ru', kind: 'showcase',
    title: 'Пять работ, с которых начинается сезон «Переход»',
    publishedAt: '2026-07-02' },
]

/**
 * Демо-страницы. Опен-колл стоит первым не по алфавиту: фестиваль живёт тем,
 * что ему присылают, и приём заявок — единственный пункт меню, у которого
 * есть срок. Пропущенный дедлайн стоит фестивалю целой программы.
 */
export const seedPages: Page[] = [
  {
    _id: 'p1', slug: 'open-call', navOrder: 10,
    title: { ru: 'Опен-колл', en: 'Open call' },
    lead: {
      ru: 'Приём работ в программу четвёртого сезона открыт до 30 июня 2026 года. Участие бесплатное.',
      en: 'Submissions for the fourth season are open until 30 June 2026. There is no entry fee.',
    },
  },
  {
    _id: 'p2', slug: 'about', navOrder: 40,
    title: { ru: 'О фестивале', en: 'About' },
    lead: {
      ru: 'Независимый международный кинофестиваль-лаборатория. Санкт-Петербург, с 2023 года.',
      en: 'An independent international film festival-laboratory. St. Petersburg, since 2023.',
    },
  },
]

/**
 * Все сезоны. Нужны и списку архива, и странице конкретного года,
 * поэтому живут здесь, а не внутри одной из страниц.
 */
export const seedArchive: Edition[] = [
  seedEdition,
  { _id: 's-2025', year: 2025, title: { ru: 'Otherworldly 2.0', en: 'Otherworldly 2.0' },
    theme: { ru: 'Нейрометаморфозы, граница, след', en: 'Neurometamorphoses, border, trace' },
    startDate: '2025-09-12', endDate: '2025-09-14', status: 'archived',
    cities: ['Санкт-Петербург', 'Москва', 'Выборг', 'Калининград'] },
  { _id: 's-2024', year: 2024, title: { ru: 'Otherworldly 1.0', en: 'Otherworldly 1.0' },
    theme: { ru: 'Призрачность образа, хонтология', en: 'Spectrality of the image, hauntology' },
    startDate: '2024-11-15', endDate: '2024-11-17', status: 'archived',
    cities: ['Санкт-Петербург', 'Москва', 'Калининград'] },
]

