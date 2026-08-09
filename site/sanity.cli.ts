import { defineCliConfig } from 'sanity/cli'
import { projectId, dataset } from './sanity.env'

/**
 * Конфигурация для командной строки Sanity.
 *
 * Появилась вынужденно: воркер Cloudflare не может быть больше 3 МБ
 * (10 МБ на платном тарифе), а встроенная Студия давала 18,5 МБ — пакет
 * `sanity` весит 22 МБ сам по себе. Студия переехала на хостинг Sanity,
 * и `sanity deploy` требует этот файл, чтобы знать, что и куда выкладывать.
 *
 * Переменные — из sanity.env.ts: Студию собирает Vite, а он видит только
 * приставку SANITY_STUDIO_. Значения те же, что у сайта, из того же .env.local.
 */
export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: 'otherworldly',
})
