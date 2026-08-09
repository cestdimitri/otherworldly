import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, hasSanity } from './env'

export const client = hasSanity
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null

/**
 * Демо-данные подставляются ровно в одном случае: проект Sanity не подключён.
 *
 * Это третья редакция правила, и предыдущие две были неверны по одной
 * и той же причине — они допускали, чтобы на одной странице оказались
 * данные из двух источников сразу.
 *
 * Что из этого выходило на живом проекте: сезон настоящий, а его события
 * демонстрационные. Страница «О фестивале» открывается, а в меню её нет —
 * потому что одиночный запрос откатывался на демо, а списочный возвращал
 * законный пустой массив. Каждый раз получалось состояние, которого нет
 * ни в одной из двух реальностей, и выглядело оно как работающий сайт.
 *
 * Правило теперь одно и без исключений:
 *   нет ключей  → весь сайт на демо-данных;
 *   есть ключи  → всё из базы, включая пустоту.
 *
 * Пустая база показывает пустой сайт. Это и есть правда о её состоянии,
 * и кураторке она полезнее правдоподобной подделки.
 */
export async function q<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!client) return fallback
  return client.fetch<T>(query, params, { next: { revalidate: 60 } })
}

/**
 * Сообщает, откуда пришёл ответ. Нужен там, где второй запрос зависит
 * от результата первого: искать события демо-сезона в настоящей базе
 * бессмысленно — его идентификатора там нет.
 *
 * После упрощения выше источник определяется одним признаком: подключён
 * ли проект вообще. Функция оставлена, потому что вызовам нужен именно
 * этот флаг, а не догадка о нём.
 */
export async function qWithSource<T>(
  query: string, params: Record<string, unknown>, fallback: T,
): Promise<{ data: T; fromSeed: boolean }> {
  if (!client) return { data: fallback, fromSeed: true }
  const data = await client.fetch<T>(query, params, { next: { revalidate: 60 } })
  return { data, fromSeed: false }
}
