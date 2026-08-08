import { defineType, defineField } from 'sanity'
import { i18nString } from './_i18n'

/** Синглтон. Открытость опен колла управляет блоком на главной. */
export const siteSettings = defineType({
  name: 'siteSettings', title: 'Настройки сайта', type: 'document',
  fields: [
    i18nString('seasonLine', 'Строка сезона'),
    defineField({ name: 'currentEdition', title: 'Текущий сезон', type: 'reference',
      to: [{ type: 'edition' }],
      description: 'От дат этого сезона зависит вся лента на главной.' }),
    defineField({ name: 'openCallOpen', title: 'Опен колл открыт', type: 'boolean', initialValue: false }),
    defineField({ name: 'openCallUrl', title: 'Ссылка на форму заявки', type: 'url' }),
    defineField({ name: 'openCallDeadline', title: 'Дедлайн опен колла', type: 'date' }),
    defineField({ name: 'email', title: 'Почта', type: 'string' }),
    defineField({ name: 'telegram', title: 'Телеграм', type: 'string' }),
    defineField({ name: 'instagram', title: 'Инстаграм', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Настройки сайта' }) },
})
