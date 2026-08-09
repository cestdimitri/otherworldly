import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/meta'

export default function robots(): MetadataRoute.Robots {
  return {
    // Запрещать /studio больше нечего: админка переехала на хостинг Sanity
    // и на этом домене её нет.
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE}/sitemap.xml`,
  }
}
