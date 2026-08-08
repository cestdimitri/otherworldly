import { defineType, defineField } from 'sanity'
import { i18nString, i18nText } from './_i18n'

/**
 * Гибкая страница: «о фестивале», «опен колл», «контакты».
 *
 * Единственный тип, который умеет заводить НОВЫЙ РАЗДЕЛ сайта без разработчика —
 * ради этого и брали настоящую CMS вместо гита с маркдауном (D-001).
 * Поэтому здесь же живёт признак «в меню»: если кураторка может создать
 * страницу, но не может на неё сослаться, толку от этого нет.
 */
export const page = defineType({
  name: 'page', title: 'Страница', type: 'document',
  fields: [
    i18nString('title', 'Заголовок', { required: true }),
    defineField({ name: 'slug', title: 'Адрес', type: 'slug',
      options: { source: 'title.ru' }, validation: (r) => r.required(),
      description: 'Латиницей. Станет адресом: /ru/адрес' }),
    i18nText('lead', 'Лид', 3),
    defineField({ name: 'blocks', title: 'Текст', type: 'array',
      of: [{ type: 'block' }, { type: 'captionedImage' }] }),
    defineField({ name: 'inNav', title: 'Показывать в меню', type: 'boolean',
      initialValue: false }),
    defineField({ name: 'navOrder', title: 'Порядок в меню', type: 'number',
      hidden: ({ parent }) => !parent?.inNav,
      description: 'Меньше — левее. Пункты сайта занимают 10–40.' }),
    defineField({ name: 'cover', title: 'Обложка', type: 'captionedImage' }),
  ],
  orderings: [{ title: 'По порядку в меню', name: 'nav',
    by: [{ field: 'navOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'title.ru', subtitle: 'slug.current', media: 'cover' },
  },
})
