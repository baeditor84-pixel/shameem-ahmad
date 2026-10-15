import type { MetadataRoute } from 'next';
import { specialtiesData } from '@/data/specialties';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.shameemcare.com';

  const specialtyUrls: MetadataRoute.Sitemap = specialtiesData.map((item) => ({
    url: `${baseUrl}/specialties/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...specialtyUrls,
  ];
}
