import type { APIRoute } from 'astro';
import { sitio } from '../config/site';

/**
 * Mapa del sitio. Solo las paginas de verdad.
 * Las paginas de canal (/g/...) quedan fuera a proposito: son copias del
 * inicio hechas para medir, no paginas nuevas.
 */
const rutas = [
  { url: '/', prioridad: '1.0' },
  { url: '/descargar', prioridad: '0.9' },
  { url: '/soporte', prioridad: '0.6' },
  { url: '/accesibilidad', prioridad: '0.6' },
  { url: '/privacidad', prioridad: '0.5' },
  { url: '/terminos', prioridad: '0.3' },
];

export const GET: APIRoute = () => {
  const cuerpo = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rutas
  .map(
    (r) => `  <url>
    <loc>${new URL(r.url, sitio.dominio).href}</loc>
    <priority>${r.prioridad}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
  return new Response(cuerpo, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
