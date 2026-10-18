import { sitio, montoPremium } from './site';
import { preguntas } from './preguntas';

/**
 * Datos estructurados (JSON-LD) para buscadores e IA.
 *
 * Todo sale de site.ts y de preguntas.ts: nada se escribe a mano aca. Y todo lo
 * que se dice aca esta tambien VISIBLE en las paginas (Google castiga los datos
 * que no se ven): la definicion arriba en el inicio, los planes en la tabla de
 * precios, las preguntas en "Preguntas frecuentes", los contactos en el pie.
 */

const url = (ruta = '/') => new URL(ruta, sitio.dominio).href;

/** De HTML simple a texto plano, para las respuestas del FAQPage. */
function aTexto(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export function organizacion() {
  const redes = [sitio.urlFacebook, sitio.urlInstagram].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': url('/#organizacion'),
    name: sitio.nombre,
    alternateName: ['NetoSmart'],
    url: url('/'),
    logo: url('/icono-512.png'),
    ...(redes.length ? { sameAs: redes } : {}),
    ...(sitio.correoContacto
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: sitio.correoContacto,
            areaServed: 'CR',
            availableLanguage: 'es',
          },
        }
      : {}),
  };
}

export function sitioWeb() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': url('/#sitio'),
    name: sitio.nombre,
    url: url('/'),
    inLanguage: 'es-CR',
  };
}

export function aplicacion() {
  const monto = String(montoPremium());
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    '@id': url('/#app'),
    name: sitio.nombre,
    alternateName: ['NetoSmart'],
    operatingSystem: 'Android',
    applicationCategory: 'FinanceApplication',
    description: sitio.definicion,
    inLanguage: 'es-CR',
    areaServed: { '@type': 'Country', name: 'Costa Rica' },
    url: url('/'),
    // Solo cuando la ficha de Google Play ya es publica.
    ...(sitio.fichaPlayPublica ? { downloadUrl: sitio.urlPlayStore } : {}),
    publisher: { '@id': url('/#organizacion') },
    offers: [
      {
        '@type': 'Offer',
        name: 'Gratis',
        price: '0',
        priceCurrency: 'CRC',
      },
      {
        '@type': 'Offer',
        name: 'Neto Smart Pro',
        price: monto,
        priceCurrency: 'CRC',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: monto,
          priceCurrency: 'CRC',
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: 'MON',
        },
      },
    ],
  };
}

export function preguntasFrecuentes() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'es-CR',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: p.respuesta.map(aTexto).join(' '),
      },
    })),
  };
}

/** JSON listo para meter dentro de <script type="application/ld+json">. */
export function comoJson(datos: unknown): string {
  // "<" escapado: evita que un texto cierre la etiqueta script por accidente.
  return JSON.stringify(datos).replace(/</g, '\\u003c');
}
