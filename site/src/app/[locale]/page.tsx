import { q, qWithSource } from '@/sanity/client'
import { ARTICLES, CURATORS, CURRENT_EDITION, EVENTS_BY_EDITION, GALLERY_SHOTS, PAST_EDITIONS } from '@/sanity/queries'
import { seedArticles, seedEdition, seedEvents } from '@/lib/seed'
import { now } from '@/lib/now'
import { dict, isLocale, t, type Locale } from '@/lib/i18n'
import type { Article, Edition, EventItem, Gallery as GalleryDoc, Img, Person } from '@/lib/types'
import { TicketButton } from '@/components/TicketButton'
import { urlFor } from '@/sanity/image'
import Link from 'next/link'
import { B } from '@/components/B'
import { Gallery } from '@/components/Gallery'
import { Reveal } from '@/components/Reveal'
import { notFound } from 'next/navigation'
import styles from './page.module.css'

/**
 * Главная — направление C, «лента»: сезон как вертикальная ось года.
 * Какая фаза подсвечена, обратный отсчёт и строка «проектор включится»
 * читаются из ОДНИХ И ТЕХ ЖЕ дат сезона (D-069). Между сезонами лента
 * не пустеет — она просто смещает подсветку.
 */
export const revalidate = 60

/**
 * Запасной фон: положить файл в site/public/hero.jpg.
 * Пустая строка означает «файла нет» — тогда рисуется градиент.
 */
const HERO_FALLBACK = '/hero.png'

type Phase = {
  id: string; when: string; state: 'done' | 'now' | 'next' | 'ahead'
  title: string; text: string
}

/** Даты сезона одной строкой. Раньше здесь стояли вписанные руками 17—20.09. */
function dateRange(ed: Edition, locale: Locale): string {
  const s = new Date(ed.startDate)
  const e = new Date(ed.endDate)
  const dd = (x: Date) => String(x.getDate()).padStart(2, '0')
  const mm = (x: Date) => String(x.getMonth() + 1).padStart(2, '0')
  return s.getMonth() === e.getMonth()
    ? `${dd(s)}—${dd(e)}.${mm(e)}.${ed.year}`
    : `${dd(s)}.${mm(s)} — ${dd(e)}.${mm(e)}.${ed.year}`
}

function buildPhases(ed: Edition, locale: Locale, today: Date): Phase[] {
  const start = new Date(ed.startDate)
  const end = new Date(ed.endDate)
  const days = Math.ceil((start.getTime() - today.getTime()) / 86_400_000)
  const running = today >= start && today <= end
  const ru = locale === 'ru'

  return [
    { id: 'prep', when: ru ? 'Май — Июль' : 'May — July', state: 'done',
      title: ru ? 'Подготовка' : 'Preparation',
      text: ru ? 'Сбор кураторской команды, определение векторов сезона.'
               : 'Assembling the curatorial team, setting the season’s vectors.' },
    { id: 'call', when: ru ? 'до 15 августа' : 'until 15 August', state: 'now',
      title: ru ? 'Опен колл' : 'Open call',
      text: ru ? 'Принимаем экспериментальные работы любой длины и любого носителя.'
               : 'We accept experimental work of any length and any carrier.' },
    { id: 'lab', when: ru ? 'Июль — Сентябрь' : 'July — September', state: 'now',
      title: ru ? 'Лаборатория лиминального образа' : 'Laboratory of the Liminal Image',
      text: ru ? 'Два месяца чтения, показов и разбора.'
               : 'Two months of reading, screenings and analysis.' },
    { id: 'fest',
      when: `${start.getDate()} — ${end.getDate()} ${ru ? 'сентября' : 'September'}`,
      state: 'next',
      title: ru ? 'Фестиваль' : 'Festival',
      text: running
        ? (ru ? 'Идёт сейчас.' : 'Running now.')
        : `${dict[locale].daysLeft} ${days} ${dict[locale].days}` },
    { id: 'echo', when: ru ? 'Октябрь' : 'October', state: 'ahead',
      title: ru ? 'Эхо в других городах' : 'Echo in other cities',
      text: ru ? 'Избранные программы едут в Москву, Выборг и Калининград.'
               : 'Selected programmes travel to Moscow, Vyborg and Kaliningrad.' },
  ]
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
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

  // Разделы ниже показываются только если для них есть содержимое:
  // пустой блок с заголовком выглядит как поломка, а не как «пока нет».
  // ?? [] на каждом: GROQ возвращает null там, где поле не заполнено,
  // и один незаполненный список не должен ронять сборку всего сайта.
  const [articles, past, curators, galleries] = await Promise.all([
    q<Article[]>(ARTICLES, { locale, limit: 4 }, seedArticles.slice(0, 4)).then((r) => r ?? []),
    q<Edition[]>(PAST_EDITIONS, {}, []).then((r) => r ?? []),
    fromSeed ? Promise.resolve([] as Person[])
             : q<Person[]>(CURATORS, { editionId: edition._id }, []).then((r) => r ?? []),
    q<GalleryDoc[]>(GALLERY_SHOTS, {}, []).then((r) => r ?? []),
  ])

  // Кадры из всех галерей в одну ленту. Больше двадцати на главной незачем:
  // это приглашение в галерею, а не сама галерея.
  const shots: Img[] = galleries.flatMap((g) => g.images ?? []).slice(0, 20)

  // Фон первого экрана. Кураторка меняет его в админке; пока не загрузила —
  // берётся файл public/hero.jpg, а если и его нет, остаётся градиент.
  const heroUrl = urlFor(edition.cover, 2200) ?? HERO_FALLBACK

  const phases = buildPhases(edition, locale, now())
  const days = events.slice(0, 4)
  const statement = t(edition.statement, locale)

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        {heroUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className={styles.photo} src={heroUrl} alt={edition.cover?.alt ?? ''} />
        ) : (
          <div className={styles.plate} aria-hidden />
        )}
        <div className={styles.beam} aria-hidden />
        <div className={styles.vig} aria-hidden />
        <div className={styles.heroIn}>
          <h1 className={`g ${styles.wordmark}`}>
            {locale === 'ru' ? <>Независимый<br />кинофестиваль<br />«По-ту-сторонний»</>
                             : <>Independent<br />film festival<br />“Otherworldly”</>}
          </h1>
          {/* Только даты и город. Название сезона с темой отсюда убрано:
              на первом экране оно повторяло заголовок и показывало пустые
              кавычки, когда тема ещё не заполнена. */}
          <div className={`g ${styles.sub}`}>
            <span>{dateRange(edition, locale)}</span>
            <i>|</i><span>{edition.cities?.[0] ?? (locale === 'ru' ? 'Санкт-Петербург' : 'St. Petersburg')}</span>
          </div>
          <p className={styles.lede}>{d.intro}</p>
          {statement.text && (
            <p className={styles.stmt} lang={statement.lang}>{statement.text}</p>
          )}
          {/* Раньше здесь были две кнопки, ведущие на один адрес.
              Теперь одна — на страницу сезона. */}
          <div className={styles.cta}>
            <B href={`/${locale}/archive/${edition.year}`}>
              {locale === 'ru' ? `Сезон ${edition.year}` : `Season ${edition.year}`}
            </B>
          </div>
        </div>
      </section>

      <Reveal>
      <section className={styles.section}>
        <h2 className={`g ${styles.shead}`}>{d.season}</h2>
        <div className={styles.tl}>
          {phases.map((p) => (
            <div key={p.id} className={`${styles.ph} ${styles[p.state]}`}>
              <div className={styles.when}>{p.when}</div>
              <div className={styles.mk} aria-hidden />
              <div>
                <div className={`k ${styles.state}`}>{p.text}</div>
                <h3 className={`g ${styles.phTitle}`}>{p.title}</h3>

                {p.id === 'fest' && (
                  <div className={`stack ${styles.days}`}>
                    {days.map((e) => {
                      const at = new Date(e.startsAt)
                      const title = t(e.title, locale)
                      return (
                        <div key={e._id} className={`surface ${styles.day}`}>
                          <div className={`g ${styles.n}`}>{at.getDate()}</div>
                          <div>
                            <div className="k">{d.strands[e.strand]}</div>
                            <div className={`g ${styles.dayTitle}`} lang={title.lang}>{title.text}</div>
                            <div className={styles.m}>
                              {t(e.venue?.name, locale).text}<i>|</i>
                              {at.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                              <i>|</i>{e.duration} {d.min}
                              {e.format === '16' && <><i>|</i>16 мм</>}
                            </div>
                          </div>
                          <TicketButton sm eventId={e.timepadEventId}
                            label={d.tickets} soonLabel={d.soon} />
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      </Reveal>

      {curators?.length > 0 && (
        <Reveal><section className={styles.section}>
          <h2 className={`g ${styles.shead}`}>{d.team}</h2>
          <div className={styles.team}>
            {curators.map((p) => (
              <div key={p._id} className={styles.por}>
                <div className={`frame ${styles.porIm}`}>
                  {urlFor(p.portrait, 600)
                    ? /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={urlFor(p.portrait, 600)} alt={p.portrait?.alt ?? ''} />
                    : <div className="ph" />}
                </div>
                <div className={`g ${styles.porName}`}>{p.name}</div>
                <div className={styles.porRole}>{t(p.role, locale).text}</div>
              </div>
            ))}
          </div>
        </section></Reveal>
      )}

      {articles?.length > 0 && (
        <Reveal><section className={styles.section}>
          <h2 className={`g ${styles.shead}`}>{d.materials}</h2>
          <div className={styles.mats}>
            {articles.map((a) => (
              <Link key={a._id}
                    href={a.externalUrl ?? `/${locale}/materials/${a.slug}`}
                    {...(a.externalUrl
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className={`surface ${styles.mat}`}>
                <div className={`frame ${styles.cov}`}>
                  {urlFor(a.cover, 800)
                    ? /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={urlFor(a.cover, 800)} alt={a.cover?.alt ?? ''} />
                    : <div className="ph" />}
                </div>
                <div className={styles.matBd}>
                  <div className="k">{d.kinds[a.kind]}</div>
                  <div className={`g ${styles.matTitle}`}>{a.title}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.more}>
            <B href={`/${locale}/materials`}>{d.allMaterials}</B>
          </div>
        </section></Reveal>
      )}

      {shots.length > 0 && (
        <Reveal><section className={styles.section}>
          <h2 className={`g ${styles.shead}`}>{d.gallery}</h2>
          <Gallery shots={shots} label={d.gallery} />
        </section></Reveal>
      )}


      {past?.length > 0 && (
        <Reveal><section className={styles.section} data-mode="archive">
          <h2 className={`g ${styles.shead}`}>{d.past}</h2>
          <div className="stack">
            {past.map((e) => (
              <Link key={e._id} href={`/${locale}/archive/${e.year}`}
                    className={`surface ${styles.pastRow}`}>
                <div className={`g ${styles.pastY}`}>{e.year}</div>
                <div>
                  <div className={`g ${styles.pastT}`}>{t(e.title, locale).text}</div>
                  <div className={styles.pastV}>{t(e.theme, locale).text}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.more}>
            <B href={`/${locale}/archive`}>{d.allSeasons}</B>
          </div>
        </section></Reveal>
      )}
    </main>
  )
}
