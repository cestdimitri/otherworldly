import { defineType, defineField } from 'sanity'
import { i18nString } from './_i18n'

export const gallery = defineType({
  name: 'gallery', title: 'Галерея', type: 'document',
  fields: [
    i18nString('title', 'Название', { required: true }),
    defineField({ name: 'edition', title: 'Сезон', type: 'reference', to: [{ type: 'edition' }] }),
    defineField({ name: 'photographer', title: 'Съёмка', type: 'reference', to: [{ type: 'person' }] }),
    /* Описание и автор кадра живут в самом типе captionedImage (D-099),
       поэтому здесь не переобъявляются. Съёмка выше — на всю галерею;
       поле у кадра нужно там, где серию снимали несколько человек,
       что на фестивале скорее правило, чем исключение. */
    defineField({ name: 'images', title: 'Кадры', type: 'array',
      of: [{ type: 'captionedImage' }] }),
  ],
  preview: { select: { title: 'title.ru', media: 'images.0' } },
})
