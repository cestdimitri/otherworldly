import { defineType, defineField } from 'sanity'
import { i18nString, i18nText } from './_i18n'

/**
 * СЕЗОН — документ, а не страница (D-011). 2027-й будет новой записью,
 * а не новой сборкой. Даты отсюда управляют всей лентой на главной:
 * какая фаза подсвечена, обратный отсчёт и строка «проектор включится».
 */
export const edition = defineType({
  name: 'edition', title: 'Сезон', type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Год', type: 'number', validation: (r) => r.required() }),
    i18nString('title', 'Название', { required: true }),
    i18nString('theme', 'Тема сезона'),
    defineField({ name: 'vectors', title: 'Векторы', type: 'array', of: [{ type: 'string' }],
      description: 'Кураторские векторы: «граница», «след», «чувственность».' }),
    i18nText('statement', 'Кураторский текст', 8),
    defineField({ name: 'startDate', title: 'Начало', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'endDate', title: 'Конец', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'status', title: 'Состояние', type: 'string',
      options: { list: [
        { title: 'Готовится', value: 'upcoming' },
        { title: 'Текущий', value: 'current' },
        { title: 'Закрыт (архив)', value: 'archived' }] },
      initialValue: 'upcoming' }),
    defineField({ name: 'cities', title: 'Города', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'curators', title: 'Кураторки', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }] }),
  ],
  orderings: [{ title: 'Год, новые сверху', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] }],
  preview: {
    select: { year: 'year', title: 'title.ru', status: 'status' },
    prepare: ({ year, title, status }) => ({
      title: `${year} — ${title ?? ''}`,
      subtitle: { upcoming: 'готовится', current: 'текущий', archived: 'архив' }[status as string] ?? '',
    }),
  },
})
