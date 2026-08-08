import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, hasSanity } from './env'

export const client = hasSanity
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null

/** Запрос с мягкой деградацией: нет Sanity — отдаём демо-данные. */
export async function q<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!client) return fallback
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60 } })
  } catch (e) {
    console.warn('[sanity] запрос не удался, отдаю демо-данные:', e)
    return fallback
  }
}
