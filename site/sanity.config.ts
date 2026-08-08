import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { projectId, dataset, apiVersion } from './src/sanity/env'

/**
 * Студия встроена в тот же проект и живёт на /studio (D-002):
 * один репозиторий, один деплой, один домен, один вход.
 * Для команды из четырёх человек, ни одна из которых не разработчик,
 * это важнее архитектурной чистоты отдельного хостинга.
 */
export default defineConfig({
  name: 'otherworldly',
  title: 'По-ту-сторонний',
  basePath: '/studio',
  projectId, dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
})
