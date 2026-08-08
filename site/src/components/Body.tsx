import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/sanity/image'
import styles from './Body.module.css'

/**
 * Тело материала из Portable Text.
 *
 * Компоненты заданы явно, а не оставлены на умолчания, по двум причинам.
 * Во-первых, умолчания рисуют <img> без обработки — а в этой системе всякое
 * изображение проходит через --img и растр, иначе цветная фотография посреди
 * монохромной страницы ломает правило громче любой ошибки вёрстки.
 * Во-вторых, у нас нет разделителей и нет нумерации разделов (D-060), поэтому
 * h3/h4 из редактора должны приходить в ту же типографику, что и остальное,
 * а не заводить свою.
 *
 * Внешние ссылки получают rel="noreferrer" — редактор вставляет их вручную,
 * и полагаться на дисциплину четырёх человек тут не стоит.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2 className="g">{children}</h2>,
    h3: ({ children }) => <h3 className="g">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="g">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? '#'
      const ext = /^https?:\/\//.test(href)
      return (
        <a href={href} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const url = urlFor(value, 1400)
      if (!url) return null
      return (
        <figure className={styles.fig}>
          <div className="frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={value?.alt ?? ''} loading="lazy" />
          </div>
          {value?.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      )
    },
  },
}

export function Body({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null
  return <PortableText value={value} components={components} />
}
