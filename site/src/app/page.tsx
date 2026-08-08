import { redirect } from 'next/navigation'
import { defaultLocale } from '@/lib/i18n'

/** Корень уводит на язык по умолчанию. Локаль — подпуть, не поддомен (D-003). */
export default function Root() {
  redirect(`/${defaultLocale}`)
}
