import { defineType, defineField } from 'sanity'
import { i18nString, i18nText } from './_i18n'

/**
 * ФИЛЬМ отделён от ПОКАЗА (D-007). Один и тот же фильм показывают
 * несколько раз и в разные сезоны — благодаря этому страница фильма
 * может собрать все свои сеансы за историю фестиваля.
 * Носитель здесь НЕ указывается: он принадлежит показу, а не произведению.
 */
export const film = defineType({
  name: 'film', title: 'Фильм', type: 'document',
  fields: [
    i18nString('title', 'Название', { required: true }),
    defineField({ name: 'originalTitle', title: 'Оригинальное название', type: 'string' }),
    defineField({ name: 'slug', title: 'Адрес', type: 'slug',
      options: { source: 'title.ru', maxLength: 96 }, validation: (r) => r.required(),
      description: 'Один слаг на оба языка (D-004): ссылку можно переслать кому угодно.' }),
    defineField({ name: 'director', title: 'Режиссёр', type: 'string' }),
    defineField({ name: 'country', title: 'Страна', type: 'string' }),
    defineField({ name: 'year', title: 'Год', type: 'number' }),
    defineField({ name: 'duration', title: 'Хронометраж, мин', type: 'number' }),
    i18nText('synopsis', 'Синопсис', 5),
    defineField({ name: 'still', title: 'Кадр', type: 'captionedImage' }),
  ],
  preview: {
    select: { title: 'title.ru', d: 'director', y: 'year', media: 'still' },
    prepare: ({ title, d, y, media }) => ({ title, subtitle: [d, y].filter(Boolean).join(' · '), media }),
  },
})
