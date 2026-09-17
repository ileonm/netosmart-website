import type { APIRoute } from 'astro';
import { sitio } from '../config/site';

export const GET: APIRoute = () => {
  const cuerpo = `User-agent: *
Allow: /
Disallow: /g/

Sitemap: ${new URL('/sitemap.xml', sitio.dominio).href}
`;
  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
