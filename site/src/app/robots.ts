import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/meta'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/studio' }],
    sitemap: `${SITE}/sitemap.xml`,
  }
}
