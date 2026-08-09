import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { projectId, dataset, apiVersion } from './sanity.env'

/**
 * Студия живёт на хостинге Sanity: otherworldly.sanity.studio.
 *
 * Это отмена D-002, и отменил её не вкус, а лимит. Воркер Cloudflare
 * не может быть больше 3 МБ; со встроенной Студией сборка весила 18,5 МБ,
 * потому что пакет `sanity` — 22 МБ. Платный тариф поднимает потолок
 * до 10 МБ, то есть не спасает тоже: решение было не про деньги.
 *
 * Что потеряли: один домен и один вход вместо двух адресов.
 * Что выиграли: сайт вообще выкладывается, и правки в Студии не требуют
 * пересборки сайта. Второе я бы не назвал утешением — это лучше исходного
 * замысла, просто выяснилось не тем путём, каким хотелось.
 */
export default defineConfig({
  name: 'otherworldly',
  title: 'По-ту-сторонний',
  // basePath НЕ задан: на своём хостинге Студия стоит в корне домена.
  // Оставшийся от встроенной версии '/studio' ломал роутер — он принимал
  // первый кусок адреса за название инструмента и отвечал «Tool not found».
  projectId, dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
})
