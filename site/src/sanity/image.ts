import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { dataset, projectId, hasSanity } from './env'

const builder = hasSanity ? createImageUrlBuilder({ projectId, dataset }) : null

/**
 * Обработка кадра — на CDN Sanity, а не в фотошопе у кураторки.
 * Обесцвечивание и контраст навешивает CSS-фильтр --img (правило 5 системы).
 */
export function urlFor(source: SanityImageSource | undefined, width = 1200) {
  if (!builder || !source) return undefined
  return builder.image(source).width(width).auto('format').fit('crop').url()
}
