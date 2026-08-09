import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { dataset, projectId, hasSanity } from './env'

const builder = hasSanity ? createImageUrlBuilder({ projectId, dataset }) : null

/**
 * Обработка кадра — на CDN Sanity, а не в фотошопе у кураторки.
 * Обесцвечивание и контраст навешивает CSS-фильтр --img (правило 5 системы).
 *
 * Возвращает undefined вместо ошибки во всех случаях, когда картинки нет.
 * Это важнее, чем кажется: поле изображения бывает заполнено НАПОЛОВИНУ —
 * кураторка вписала описание и не приложила файл. Объект при этом
 * непустой, прежняя проверка его пропускала, и сборка всего сайта падала
 * из-за одного незагруженного файла в одном событии.
 *
 * Ни одна страница не должна ломаться из-за картинки. Нет картинки —
 * рисуется заглушка.
 */
export function urlFor(source: SanityImageSource | undefined, width = 1200) {
  if (!builder || !source) return undefined

  // Ссылка на файл может лежать как в asset._ref, так и в самом значении,
  // если запрос вернул строку-идентификатор.
  const asset = (source as { asset?: { _ref?: string; _id?: string } }).asset
  const hasFile =
    typeof source === 'string' ||
    Boolean(asset?._ref) ||
    Boolean(asset?._id)
  if (!hasFile) return undefined

  try {
    return builder.image(source).width(width).auto('format').fit('crop').url()
  } catch {
    // Битое значение в базе не должно ронять страницу.
    return undefined
  }
}
