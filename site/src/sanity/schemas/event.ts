import { defineType, defineField } from 'sanity'
import { i18nString, i18nText } from './_i18n'

/**
 * ПОКАЗ. Расписание — это ЗАПРОС по показам, а не отдельный документ (D-008):
 * кураторка вводит событие один раз с датой и площадкой, сетка собирается сама.
 * Носитель (16 мм / цифра) живёт здесь: одна работа в 2025-м шла с цифры,
 * в 2026-м идёт с плёнки — для этой аудитории это разные события.
 */
export const event = defineType({
  name: 'event', title: 'Событие', type: 'document',
  fields: [
    i18nString('title', 'Название', { required: true }),
    defineField({ name: 'slug', title: 'Адрес', type: 'slug',
      options: { source: 'title.ru', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'edition', title: 'Сезон', type: 'reference',
      to: [{ type: 'edition' }], validation: (r) => r.required() }),
    defineField({ name: 'strand', title: 'Полоса', type: 'string',
      options: { list: [
        { title: 'Фестиваль', value: 'fest' },
        { title: 'Лаборатория', value: 'lab' },
        { title: 'Спецпрограмма', value: 'spec' },
        { title: 'Эхо в других городах', value: 'echo' }] },
      initialValue: 'fest', validation: (r) => r.required(),
      description: 'На сайте полоса обозначается ТОЛЬКО подписью — ни цветом, ни значком (D-090).' }),
    defineField({ name: 'startsAt', title: 'Начало', type: 'datetime',
      validation: (r) => r.required(),
      options: { dateFormat: 'DD.MM.YYYY', timeFormat: 'HH:mm' } }),
    defineField({ name: 'duration', title: 'Длительность, мин', type: 'number',
      validation: (r) => r.required().min(1),
      description: 'Определяет высоту блока в сетке расписания — строка равна 30 минутам.' }),
    defineField({ name: 'venue', title: 'Площадка', type: 'reference', to: [{ type: 'venue' }] }),
    defineField({ name: 'format', title: 'Носитель', type: 'string',
      options: { list: [{ title: '16 мм', value: '16' }, { title: 'Цифра', value: 'dig' }] },
      initialValue: 'dig' }),
    defineField({ name: 'films', title: 'Фильмы', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'film' }] }] }),
    i18nText('description', 'Описание', 4),
    defineField({ name: 'cover', title: 'Обложка', type: 'captionedImage' }),
    defineField({ name: 'timepadEventId', title: 'ID события в Timepad', type: 'string',
      description: 'Пусто — кнопка билета покажет «скоро в продаже» вместо мёртвой ссылки (D-010).' }),
  ],
  orderings: [{ title: 'По времени', name: 'byTime', by: [{ field: 'startsAt', direction: 'asc' }] }],
  preview: {
    select: { title: 'title.ru', at: 'startsAt', strand: 'strand', media: 'cover' },
    prepare: ({ title, at, strand, media }) => ({
      title,
      subtitle: [at ? new Date(at).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '',
        { fest: 'Фестиваль', lab: 'Лаборатория', spec: 'Спец', echo: 'Эхо' }[strand as string]].filter(Boolean).join(' · '),
      media,
    }),
  },
})
