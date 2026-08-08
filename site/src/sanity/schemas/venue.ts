import { defineType, defineField } from 'sanity'
import { i18nString } from './_i18n'

export const venue = defineType({
  name: 'venue', title: 'Площадка', type: 'document',
  fields: [
    i18nString('name', 'Название', { required: true }),
    defineField({ name: 'city', title: 'Город', type: 'string', initialValue: 'Санкт-Петербург' }),
    defineField({ name: 'address', title: 'Адрес', type: 'string' }),
    defineField({ name: 'mapLink', title: 'Ссылка на карту', type: 'url' }),
  ],
  preview: { select: { title: 'name.ru', subtitle: 'city' } },
})
