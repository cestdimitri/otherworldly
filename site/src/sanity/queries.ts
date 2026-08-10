import { groq } from 'next-sanity'

/**
 * Сезон, о котором сайт рассказывает сейчас. От его дат зависит вся лента
 * на главной.
 *
 * Раньше здесь стояло status=="current", и это было прямым противоречием:
 * главная СЧИТАЕТ ОБРАТНЫЙ ОТСЧЁТ до начала, то есть рассчитана на сезон,
 * который ещё не наступил, — а «current» означает «идёт прямо сейчас».
 * Значение по умолчанию в схеме — «готовится», так что первый же заведённый
 * кураторкой сезон гарантированно не попадал на сайт, и она видела
 * демо-данные без единого намёка на причину.
 *
 * Теперь берём ближайший незакрытый сезон по дате начала. Если идёт
 * фестиваль — возьмётся он (его дата раньше). Если не идёт — следующий.
 * Между сезонами сайт не пустеет, и никакое поле руками переключать не надо.
 */
export const CURRENT_EDITION = groq`
*[_type=="edition" && status != "archived"] | order(startDate asc)[0]{
  _id, year, title, theme, startDate, endDate, status, vectors, cities, statement, cover
}`

/**
 * Расписание — ЗАПРОС по событиям, а не отдельный документ (D-008).
 * Кураторка вводит показ один раз, сетка собирается сама и не может
 * разойтись с программой.
 */
export const EVENTS_BY_EDITION = groq`
*[_type=="event" && edition._ref==$editionId] | order(startsAt asc){
  _id, "slug": slug.current, title, strand, startsAt, duration, format, timepadEventId,
  cover,
  venue->{_id, name, city},
  films[]->{_id, "slug": slug.current, title, director, year, duration, still}
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
  _id, "slug": slug.current, language, title, kind, dek, publishedAt, externalUrl, cover
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

/** Прошедшие сезоны — короткий список на главную, полный лежит в архиве. */
export const PAST_EDITIONS = groq`
*[_type=="edition" && status=="archived"] | order(year desc)[0...2]{
  _id, year, title, theme, cities
}`

/**
 * Кураторки сезона.
 *
 * Записано через фильтр по людям, а не через `edition.curators[]->`:
 * вторая форма возвращает null, если поле у сезона не заполнено, а не
 * пустой список. Страница ждала массив и падала на сборке.
 */
export const CURATORS = groq`
*[_type=="person" && _id in *[_type=="edition" && _id==$editionId][0].curators[]._ref]{
  _id, name, role, portrait
}`

/**
 * Запасной список: кураторки последнего сезона, где они вообще указаны.
 *
 * Нужен потому, что состав команды меняется реже, чем заводятся сезоны.
 * Новый сезон создаётся пустым, и до тех пор, пока кураторка не вспомнит
 * заполнить поле, раздел на главной исчезал целиком — хотя люди те же
 * самые и лежат в базе.
 */
export const CURATORS_LATEST = groq`
*[_type=="person" && _id in (
  *[_type=="edition" && count(curators) > 0] | order(year desc)[0].curators[]._ref
)]{ _id, name, role, portrait }`

/**
 * Кадры для галереи на главной. Берём снимки из всех галерей подряд,
 * свежие сверху: на главной важен не разбор по сезонам, а живое
 * свидетельство, что фестиваль происходил.
 */
export const GALLERY_SHOTS = groq`
*[_type=="gallery" && count(images) > 0] | order(_createdAt desc){
  _id, title, images[]{ ..., "alt": alt, "caption": caption }
}`
