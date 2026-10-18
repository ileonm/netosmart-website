import type { APIRoute } from 'astro';
import { sitio } from '../config/site';

/**
 * Robots de IA y buscadores con permiso EXPLICITO. Es redundante con el bloque
 * de "*" (que ya los deja pasar), pero deja clara la intencion: Neto Smart
 * quiere que las IA lo encuentren y lo expliquen bien. Las paginas de canal
 * (/g/) y de paso (/ir/) quedan fuera para todos.
 */
const robotsIA = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
];

const reglas = `Allow: /
Disallow: /g/
Disallow: /ir/
`;

export const GET: APIRoute = () => {
  const cuerpo = `${robotsIA.map((r) => `User-agent: ${r}\n${reglas}`).join('\n')}
User-agent: *
${reglas}
Sitemap: ${new URL('/sitemap.xml', sitio.dominio).href}
`;
  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
