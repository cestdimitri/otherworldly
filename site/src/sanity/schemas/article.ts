import { defineType, defineField } from 'sanity'

/**
 * МАТЕРИАЛ переводится на уровне ДОКУМЕНТА, а не поля (D-005):
 * английская версия часто отдельный текст, а не перевод, и может
 * вообще не существовать. Поле externalUrl позволяет держать в той же
 * ленте внешние публикации (интервью Пилигриму, шоукейсы).
 */
export const article = defineType({
  name: 'article', title: 'Материал', type: 'document',
  fields: [
    defineField({ name: 'language', title: 'Язык', type: 'string',
      options: { list: [{ title: 'Русский', value: 'ru' }, { title: 'English', value: 'en' }] },
      initialValue: 'ru', validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Заголовок', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Адрес', type: 'slug',
      options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'kind', title: 'Тип', type: 'string',
      options: { list: [
        { title: 'Интервью', value: 'interview' },
        { title: 'Текст', value: 'essay' },
        { title: 'Шоукейс', value: 'showcase' },
        { title: 'Хроника', value: 'chronicle' }] },
      initialValue: 'essay' }),
    defineField({ name: 'dek', title: 'Подзаголовок', type: 'text', rows: 2 }),
    defineField({ name: 'cover', title: 'Обложка', type: 'captionedImage',
      description: 'Обложка обязательна: карточки материалов на сайте фотографические.' }),
    defineField({ name: 'author', title: 'Автор', type: 'reference', to: [{ type: 'person' }] }),
    defineField({ name: 'publishedAt', title: 'Дата публикации', type: 'datetime',
      validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Текст', type: 'array',
      of: [{ type: 'block' }, { type: 'captionedImage' }] }),
    defineField({ name: 'externalUrl', title: 'Внешняя ссылка', type: 'url',
      description: 'Если материал опубликован не у нас — карточка поведёт наружу.' }),
    defineField({ name: 'translationOf', title: 'Перевод материала', type: 'reference',
      to: [{ type: 'article' }] }),
  ],
  orderings: [{ title: 'Свежие сверху', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'kind', media: 'cover' } },
})
