import type { MetadataRoute } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import { absUrl } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import { getServices, getZones, getArticles } from '@/lib/content'

/**
 * sitemap.xml généré au build (SSG). N'inclut QUE les pages indexables.
 * Les pages utilitaires noindex (merci, confidentialité, cgu, cookies) sont exclues.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPaths = ['/', '/zones', '/contact', '/mentions-legales']
  // /tarifs (mise à jour du 25/09/2026) : listée dès que la page existe dans app/tarifs,
  // jamais une URL de sitemap qui répondrait 404 sur un site du template qui ne l'a pas.
  if (fs.existsSync(path.join(process.cwd(), 'app', 'tarifs', 'page.tsx'))) staticPaths.push('/tarifs')
  if (siteConfig.features.blog) staticPaths.push('/conseils')

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: absUrl(p),
    lastModified: now,
    changeFrequency: p === '/' ? 'weekly' : 'monthly',
    priority: p === '/' ? 1 : 0.7,
  }))

  for (const s of getServices()) {
    entries.push({ url: absUrl(`/services/${s.slug}`), lastModified: now, changeFrequency: 'monthly', priority: 0.8 })
  }
  for (const z of getZones()) {
    entries.push({ url: absUrl(`/zones/${z.slug}`), lastModified: now, changeFrequency: 'monthly', priority: 0.6 })
  }
  if (siteConfig.features.blog) {
    for (const a of getArticles()) {
      entries.push({ url: absUrl(`/conseils/${a.slug}`), lastModified: a.date, changeFrequency: 'monthly', priority: 0.5 })
    }
  }

  return entries
}
