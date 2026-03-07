'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  label: string
  url: string
}

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1)
  }

  return path
}

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = normalizePath(usePathname() || '/')

  return (
    <>
      {items.map((item, index) => {
        const itemPath = normalizePath(item.url)
        const isActive = pathname === itemPath

        return (
          <Link
            key={`${item.url}-${index}`}
            href={item.url}
            className={isActive ? 'is-active' : undefined}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </>
  )
}
