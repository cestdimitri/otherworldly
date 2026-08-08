export type I18n = { ru?: string; en?: string }
export type Strand = 'fest' | 'lab' | 'spec' | 'echo'

export type Venue = { _id: string; name: I18n; city?: string }
export type Film = {
  _id: string; slug: string; title: I18n; originalTitle?: string
  director?: string; country?: string; year?: number; duration?: number
  synopsis?: I18n; still?: Img
}
export type EventItem = {
  _id: string; slug: string; title: I18n; strand: Strand
  startsAt: string; duration: number; format?: '16' | 'dig'
  venue?: Venue; films?: Film[]; timepadEventId?: string; coverUrl?: string
}
export type Edition = {
  _id: string; year: number; title: I18n; theme?: I18n
  startDate: string; endDate: string
  status: 'upcoming' | 'current' | 'archived'
  vectors?: string[]; cities?: string[]; statement?: I18n
}
/** Изображение с описанием — форма, которую отдаёт схема captionedImage. */
export type Img = {
  _type?: string; asset?: unknown; hotspot?: unknown
  alt?: string; decorative?: boolean; caption?: string; credit?: string
}

export type Article = {
  _id: string; slug: string; language: 'ru' | 'en'; title: string
  kind: 'interview' | 'essay' | 'showcase' | 'chronicle'
  dek?: string; publishedAt: string; externalUrl?: string
  cover?: Img
  /** Portable Text. Форма блоков задаётся редактором, поэтому unknown[]. */
  body?: unknown[]
}

export type Page = {
  _id: string; slug: string; title: I18n; lead?: I18n
  blocks?: unknown[]; cover?: Img; navOrder?: number
}

/**
 * Сеанс со стороны фильма: не событие целиком, а то, что нужно знать
 * в биографии работы — когда, где, на чём и в каком сезоне.
 */
export type Screening = {
  _id: string; startsAt: string; format?: '16' | 'dig'
  timepadEventId?: string; strand: Strand
  venue?: Venue
  edition: { year: number; title?: I18n; status: Edition['status'] }
}
