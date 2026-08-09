import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, hasSanity } from './env'

export const client = hasSanity
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null

/**
 * Запрос с мягкой деградацией.
 *
 * Откат срабатывает в трёх случаях, а не в двух, как было сначала:
 *   1. проект Sanity не заведён — ключей нет;
 *   2. запрос упал — сеть, опечатка в GROQ, недоступный датасет;
 *   3. запрос УСПЕШНО вернул null — в базе нет такого документа.
 *
 * Третий случай стоил сборки. Пустая база — не ошибка, это нормальное
 * состояние только что созданного проекта, то есть ровно тот момент, когда
 * код запускается впервые. Проекции с [0] отдавали null, null проходил
 * дальше как валидный ответ, и страница падала на первом же обращении к полю.
 *
 * Пустой МАССИВ откатом не считается: «статей пока нет» — законный ответ,
 * и подменять его демо-данными значило бы врать о содержимом базы.
 */
export async function q<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!client) return fallback
  try {
    const data = await client.fetch<T>(query, params, { next: { revalidate: 60 } })
    if (data === null || data === undefined) return fallback
    return data
  } catch (e) {
    console.warn('[sanity] запрос не удался, отдаю демо-данные:', e)
    return fallback
  }
}

/**
 * Тот же запрос, но честно сообщает, откуда пришёл ответ.
 *
 * Нужен там, где второй запрос зависит от результата первого. Если сезон
 * подставился демонстрационный, искать его события в настоящей базе
 * бессмысленно: идентификатор `seed-2026` там не существует, вернётся пусто,
 * и на экране окажется сезон из демо-данных с пустой программой — состояние,
 * которого нет ни в одной из двух реальностей.
 */
export async function qWithSource<T>(
  query: string, params: Record<string, unknown>, fallback: T,
): Promise<{ data: T; fromSeed: boolean }> {
  if (!client) return { data: fallback, fromSeed: true }
  try {
    const data = await client.fetch<T>(query, params, { next: { revalidate: 60 } })
    if (data === null || data === undefined) return { data: fallback, fromSeed: true }
    return { data, fromSeed: false }
  } catch (e) {
    console.warn('[sanity] запрос не удался, отдаю демо-данные:', e)
    return { data: fallback, fromSeed: true }
  }
}
