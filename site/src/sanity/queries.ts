import { groq } from 'next-sanity'

/** Текущий сезон — от его дат зависит вся лента на главной. */
export const CURRENT_EDITION = groq`
*[_type=="edition" && status=="current"][0]{
  _id, year, title, theme, startDate, endDate, status, vectors, cities, statement
}`

/**
 * Расписание — ЗАПРОС по событиям, а не отдельный документ (D-008).
 * Кураторка вводит показ один раз, сетка собирается сама и не может
 * разойтись с программой.
 */
export const EVENTS_BY_EDITION = groq`
*[_type=="event" && edition._ref==$editionId] | order(startsAt asc){
  _id, slug, title, strand, startsAt, duration, format, timepadEventId,
  venue->{_id, name, city},
  films[]->{_id, "slug": slug.current, title, director, year, duration}
}`

/** Фильм по адресу. Адрес принадлежит ФИЛЬМУ, а не сеансу: одна работа — одна страница. */
export const FILM_BY_SLUG = groq`
*[_type=="film" && slug.current==$slug][0]{
  _id, "slug": slug.current, title, originalTitle, director, country, year,
  duration, synopsis, still
}`

export const FILM_SLUGS = groq`*[_type=="film" && defined(slug.current)]{ "slug": slug.current }`

/**
 * Все сеансы одной работы за историю фестиваля — то, ради чего film и event
 * разведены в модели (D-007). Порядок обратный: свежий сеанс сверху, история
 * уходит вниз. Именно этого текущий сайт не умеет вообще.
 */
export const SCREENINGS_OF_FILM = groq`
*[_type=="event" && references($filmId)] | order(startsAt desc){
  _id, startsAt, format, timepadEventId, strand,
  venue->{_id, name, city},
  edition->{year, title, status}
}`

export const ARTICLES = groq`
*[_type=="article" && language==$locale] | order(publishedAt desc)[0...$limit]{
  _id, "slug": slug.current, language, title, kind, dek, publishedAt, externalUrl
}`

/** Гибкие страницы, отмеченные для меню. Порядок задаёт кураторка, не код. */
export const NAV_PAGES = groq`
*[_type=="page" && inNav==true] | order(navOrder asc){
  _id, "slug": slug.current, title, navOrder
}`

export const PAGE_BY_SLUG = groq`
*[_type=="page" && slug.current==$slug][0]{
  _id, "slug": slug.current, title, lead, blocks, cover
}`

export const PAGE_SLUGS = groq`*[_type=="page" && defined(slug.current)]{
  "slug": slug.current
}`
