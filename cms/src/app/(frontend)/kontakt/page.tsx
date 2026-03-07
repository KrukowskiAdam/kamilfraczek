import React from 'react'

import { getPageBySlug } from '../getPageBySlug'

type HeroBlockData = {
  blockType: 'hero'
  title?: string | null
  description?: string | null
  backgroundImage?: {
    url?: string | null
  } | null
}

export default async function ContactPage() {
  const page = await getPageBySlug('kontakt')
  const hero = page?.layout?.find((block) => block.blockType === 'hero') as HeroBlockData | undefined
  const backgroundImageUrl = hero?.backgroundImage?.url || null

  return (
    <section className="hero-fullbleed">
      <div
        className="hero-banner"
        style={
          backgroundImageUrl
            ? {
                backgroundImage: `url(${backgroundImageUrl})`,
              }
            : undefined
        }
      >
        <div className="hero-content-container">
          <div className="hero-panel">
            <h1>{hero?.title || page?.heroTitle || page?.title || 'Kontakt'}</h1>
            <p>{hero?.description || page?.heroSubtitle || 'Tu dodamy dane kontaktowe z CMS w kolejnym kroku.'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
