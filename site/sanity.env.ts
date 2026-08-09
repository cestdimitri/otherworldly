/**
 * Переменные для СТУДИИ. Отдельно от src/sanity/env.ts — и это не дублирование
 * по недосмотру.
 *
 * Сайт собирает Next.js, Студию — Vite. Каждый подставляет в код только те
 * переменные, которые считает своими: Next.js — с приставкой NEXT_PUBLIC_,
 * Vite внутри Sanity — с приставкой SANITY_STUDIO_. Общего имени, которое
 * увидели бы оба, не существует.
 *
 * Именно на этом Студия и выкатилась пустой: конфиг читал NEXT_PUBLIC_*,
 * Vite про них не знал, projectId оказался пустой строкой, и приложение
 * упало на запуске.
 *
 * Значения берутся из того же .env.local, что и у сайта, просто под вторым
 * именем. Идентификатор проекта не секрет — он и так уходит в браузер
 * с каждым запросом к API.
 */
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? ''
export const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'
export const apiVersion = process.env.SANITY_STUDIO_API_VERSION ?? '2026-08-03'

if (!projectId) {
  throw new Error(
    'Не задан SANITY_STUDIO_PROJECT_ID. Впишите его в site/.env.local — ' +
    'то же значение, что и у NEXT_PUBLIC_SANITY_PROJECT_ID.',
  )
}
