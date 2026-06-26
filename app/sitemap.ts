import { MetadataRoute } from 'next';

const paths = ['', '/about', '/executive-bureau', '/news', '/orientation', '/faq', '/structures', '/join', '/resources', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `https://uget.tn${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
  }));
}
