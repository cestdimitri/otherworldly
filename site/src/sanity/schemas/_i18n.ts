import { defineField } from 'sanity'

/**
 * Перевод на уровне ПОЛЯ — для фильмов, событий, людей (D-005).
 * Оба языка стоят рядом в форме, поэтому кураторка физически не может
 * создать английское событие, которого нет по-русски.
 * Статьи переводятся на уровне ДОКУМЕНТА — там EN часто отдельный текст.
 */
export const i18nString = (name: string, title: string, opts: {required?: boolean} = {}) =>
  defineField({
    name, title, type: 'object',
    options: { columns: 2 },
    fields: [
      { name: 'ru', title: 'Русский', type: 'string',
        validation: opts.required ? (r) => r.required() : undefined },
      { name: 'en', title: 'English', type: 'string' },
    ],
  })

export const i18nText = (name: string, title: string, rows = 4) =>
  defineField({
    name, title, type: 'object',
    fields: [
      { name: 'ru', title: 'Русский', type: 'text', rows },
      { name: 'en', title: 'English', type: 'text', rows },
    ],
  })
