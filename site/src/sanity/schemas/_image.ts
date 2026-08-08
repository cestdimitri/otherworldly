import { defineType, defineField } from 'sanity'

/**
 * Изображение с текстовым описанием.
 *
 * Поле alt обязательное, и это не педантизм: в аудите текущего сайта
 * (08-visual-audit) из семи изображений описание было ровно у нуля.
 * Схема — единственное место, где это можно починить один раз, а не
 * напоминать четырём редакторам на каждой публикации.
 *
 * Для декоративных кадров есть отдельный флаг: пустой alt должен быть
 * осознанным решением, а не пропущенным полем.
 */
export const captionedImage = defineType({
  name: 'captionedImage',
  title: 'Изображение',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt', title: 'Описание для незрячих', type: 'string',
      description: 'Что на кадре. Читает экранный диктор и поисковик.',
      hidden: ({ parent }) => parent?.decorative === true,
      validation: (r) => r.custom((v, ctx) => {
        const parent = ctx.parent as { decorative?: boolean } | undefined
        if (parent?.decorative) return true
        return v ? true : 'Опишите кадр или отметьте его декоративным'
      }),
    }),
    defineField({
      name: 'decorative', title: 'Декоративное', type: 'boolean', initialValue: false,
      description: 'Фон или орнамент — диктор его пропустит.',
    }),
    defineField({ name: 'caption', title: 'Подпись', type: 'string',
      description: 'Видимая подпись под кадром. Не заменяет описание.' }),
    defineField({ name: 'credit', title: 'Автор кадра', type: 'string',
      description: 'Кто снял. Ставится, если это не автор всей серии.' }),
  ],
})
