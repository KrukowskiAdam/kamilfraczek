import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Hero',
  },
  fields: [
    {
      name: 'title',
      label: 'Tytuł',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'textarea',
      required: true,
    },
    {
      name: 'backgroundImage',
      label: 'Tło banera',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
