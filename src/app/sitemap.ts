import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://japan-starter.vercel.app'
  
  const cities = [
    'tokyo',
    'osaka',
    'kyoto',
    'hiroshima',
    'nara',
    'nikko',
    'hakone',
    'takayama',
    'kanazawa',
    'mount-fuji'
  ]

  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/cities/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...cityPages,
  ]
}
