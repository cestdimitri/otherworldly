import { defineType, defineField } from 'sanity'
import { i18nString, i18nText } from './_i18n'

export const person = defineType({
  name: 'person', title: 'Человек', type: 'document',
  fields: [
    i18nString('name', 'Имя', { required: true }),
    i18nString('role', 'Роль'),
    i18nText('bio', 'Биография', 3),
    defineField({ name: 'portrait', title: 'Портрет', type: 'captionedImage',
      description: 'Кроп задаётся точкой фокуса — сайт обрежет сам под 4:5.' }),
    defineField({ name: 'links', title: 'Ссылки', type: 'array', of: [{ type: 'url' }] }),
  ],
  preview: { select: { title: 'name.ru', subtitle: 'role.ru', media: 'portrait' } },
})
