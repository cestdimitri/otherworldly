'use client'
import { useState } from 'react'
import { Overlay } from './Overlay'
import { t, type Locale } from '@/lib/i18n'
import type { Person } from '@/lib/types'
import { urlFor } from '@/sanity/image'
import styles from './Curators.module.css'

/** Ссылка одной строкой: домен вместо длинного адреса. */
function label(url: string) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, '')
    return h === 't.me' ? 'Telegram' : h === 'www.instagram.com' || h === 'instagram.com'
      ? 'Instagram' : h
  } catch { return url }
}

export function Curators({ people, locale }: { people: Person[]; locale: Locale }) {
  const [open, setOpen] = useState<Person | null>(null)

  return (
    <>
      <div className={styles.grid}>
        {people.map((p) => {
          const name = t(p.name, locale)
          const src = urlFor(p.portrait, 600)
          const hasBio = Boolean(t(p.bio, locale).text)
          const Card = (
            <>
              <div className={`frame ${styles.im}`}>
                {src
                  ? /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={src} alt={p.portrait?.alt ?? ''} />
                  : <div className="ph" />}
              </div>
              <div className={`g ${styles.name}`} lang={name.lang}>{name.text}</div>
              <div className={styles.role}>{t(p.role, locale).text}</div>
            </>
          )

          // Карточка кликабельна, только если есть что показать.
          // Кнопка, которая открывает пустоту, хуже отсутствия кнопки.
          return hasBio ? (
            <button key={p._id} className={`${styles.card} ${styles.on}`}
                    onClick={() => setOpen(p)}>
              {Card}
            </button>
          ) : (
            <div key={p._id} className={styles.card}>{Card}</div>
          )
        })}
      </div>

      <Overlay open={Boolean(open)} onClose={() => setOpen(null)}
               label={open ? t(open.name, locale).text : ''}>
        {open && (
          <div className={styles.profile}>
            <div className={`frame ${styles.big}`}>
              {urlFor(open.portrait, 900)
                ? /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={urlFor(open.portrait, 900)} alt={open.portrait?.alt ?? ''} />
                : <div className="ph" />}
            </div>
            <div className={styles.text}>
              <div className="k">{t(open.role, locale).text}</div>
              <h3 className={`g ${styles.bigName}`}>{t(open.name, locale).text}</h3>
              <p className={styles.bio}>{t(open.bio, locale).text}</p>
              {open.links?.length ? (
                <div className={styles.links}>
                  {open.links.map((u) => (
                    <a key={u} href={u} target="_blank" rel="noopener noreferrer">
                      {label(u)} ↗
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </Overlay>
    </>
  )
}
