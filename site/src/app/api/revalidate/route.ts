import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { locales } from '@/lib/i18n'

/**
 * Вебхук Sanity → ревалидация. Без него правка в Студии видна только через
 * revalidate-окно (60 с), а кураторке нужно видеть результат сразу.
 *
 * Ревалидируем не весь сайт, а маршруты, которых коснулся изменённый тип:
  * сброс всего кэша на каждую правку запятой — это те же 60 секунд, только дороже.
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: 'bad secret' }, { status: 401 })
  }

  const body = (await req.json().catch(() => ({}))) as { _type?: string; slug?: string }
  const type = body._type

  const paths = new Set<string>()
  const both = (p: string) => locales.forEach((l) => paths.add(`/${l}${p}`))

  switch (type) {
    case 'event':
    case 'edition':
    case 'siteSettings':
      // Лента на главной, расписание и программа читают одни и те же данные.
      both(''); both('/timetable'); both('/programme'); both('/archive')
      break
    case 'film':
      both('/programme')
      if (body.slug) both(`/film/${body.slug}`)
      break
    case 'article':
      both('/materials')
      if (body.slug) both(`/materials/${body.slug}`)
      break
    case 'gallery':
    case 'person':
      both(''); both('/archive')
      break
    default:
      both('')
  }

  paths.forEach((p) => revalidatePath(p))
  return NextResponse.json({ ok: true, revalidated: [...paths] })
}
