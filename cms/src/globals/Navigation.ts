import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      labels: {
        singular: 'Menu item',
        plural: 'Menu items',
      },
      defaultValue: [
        { label: 'Strona główna', url: '/' },
        { label: 'Portfolio', url: '/portfolio' },
        { label: 'Kontakt', url: '/kontakt' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
