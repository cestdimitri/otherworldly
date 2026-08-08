import { captionedImage } from './_image'
import { edition } from './edition'
import { event } from './event'
import { film } from './film'
import { venue } from './venue'
import { article } from './article'
import { gallery } from './gallery'
import { person } from './person'
import { page } from './page'
import { siteSettings } from './siteSettings'

/** Девять типов — ровно те, что описаны в 04-cms-architecture.md. */
export const schemaTypes = [
  captionedImage, edition, event, film, venue, article, gallery, person, page, siteSettings,
]
