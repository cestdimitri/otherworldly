import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    // Изображения приходят с CDN Sanity: ресайз, кроп и webp/avif на их стороне.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
}
export default config

// Даёт локальному `next dev` доступ к привязкам воркера, чтобы разработка
// шла в тех же условиях, в которых сайт потом работает. Вызов обязан стоять
// после экспорта — так в документации адаптера.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
initOpenNextCloudflareForDev()
