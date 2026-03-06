import React from 'react'

import { getPageBySlug } from '../getPageBySlug'

export default async function PortfolioPage() {
  const page = await getPageBySlug('portfolio')

  return (
    <section className="page">
      <h1>{page?.heroTitle || page?.title || 'Portfolio'}</h1>
      <p>{page?.heroSubtitle || 'Tu dodamy projekty z CMS w kolejnym kroku.'}</p>
    </section>
  )
}
