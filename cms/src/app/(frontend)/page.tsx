import React from 'react'

import { getPageBySlug } from './getPageBySlug'

export default async function HomePage() {
  const page = await getPageBySlug('home')

  return (
    <section className="page">
      <h1>{page?.heroTitle || page?.title || 'Strona główna'}</h1>
      <p>
        {page?.heroSubtitle ||
          'To jest prosta wersja startowa. Edytuj treść w CMS: Pages → rekord o slugu "home".'}
      </p>
    </section>
  )
}
