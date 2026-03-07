import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { NavLinks } from './NavLinks'
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
    depth: 1,
  })

  const navItems = navigation.items && navigation.items.length > 0 ? navigation.items : fallbackItems
  const logoLink = navigation.logoLink || '/'
  const logoSrc =
    typeof navigation.logoImage === 'object' && navigation.logoImage && 'url' in navigation.logoImage
      ? navigation.logoImage.url || '/logo-placeholder.svg'
      : '/logo-placeholder.svg'

  return (
    <html lang="pl" suppressHydrationWarning>
      <body>
        <header className="site-header">
          <div className="site-nav-container">
            <Link href={logoLink} className="site-brand" aria-label="Strona główna">
              <img src={logoSrc} alt="Logo" className="site-brand-logo" />
            </Link>
            <nav className="site-nav" aria-label="Główna nawigacja">
              <NavLinks items={navItems} />
            </nav>
          </div>
        </header>
        <main className="site-main">{children}</main>
      </body>
    </html>
  )
}
