import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import './styles.css'

export const metadata = {
  description: 'Prosty frontend pod migrację do CMS',
  title: 'Kamil - CMS',
}

const fallbackItems = [
  { label: 'Strona główna', url: '/' },
  { label: 'Portfolio', url: '/portfolio' },
  { label: 'Kontakt', url: '/kontakt' },
]

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })

  const navigation = await payload.findGlobal({
    slug: 'navigation',
    depth: 0,
  })

  const navItems = navigation.items && navigation.items.length > 0 ? navigation.items : fallbackItems

  return (
    <html lang="pl" suppressHydrationWarning>
      <body>
        <header className="site-header">
          <nav className="site-nav" aria-label="Główna nawigacja">
            {navItems.map((item, index) => (
              <Link key={`${item.url}-${index}`} href={item.url}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="site-main">{children}</main>
      </body>
    </html>
  )
}
