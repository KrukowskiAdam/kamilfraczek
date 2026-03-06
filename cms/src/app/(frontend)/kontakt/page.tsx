import React from 'react'

import { getPageBySlug } from '../getPageBySlug'

export default async function ContactPage() {
  const page = await getPageBySlug('kontakt')

  return (
    <section className="page">
      <h1>{page?.heroTitle || page?.title || 'Kontakt'}</h1>
      <p>{page?.heroSubtitle || 'Tu dodamy dane kontaktowe z CMS w kolejnym kroku.'}</p>
    </section>
  )
}
