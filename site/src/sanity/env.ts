export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-08-03'

/**
 * Пока проект Sanity не заведён, сайт работает на демо-данных из src/lib/seed.ts.
 * Это сделано намеренно: репозиторий должен запускаться сразу после npm install,
 * иначе показать его кому-то можно только вместе с ключами.
 */
export const hasSanity = Boolean(projectId)
