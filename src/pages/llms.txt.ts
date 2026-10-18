import type { APIRoute } from 'astro';
import { sitio } from '../config/site';

/**
 * llms.txt (llmstxt.org): un resumen de Neto Smart para las IA.
 * Todo sale de site.ts, asi que el precio y los dias de prueba no se desfasan.
 * No lista /pagar a proposito: el SINPE solo se menciona en /pagar, terminos y
 * privacidad.
 */
const url = (ruta: string) => new URL(ruta, sitio.dominio).href;

export const GET: APIRoute = () => {
  const cuerpo = `# ${sitio.nombre}

> ${sitio.definicion}

- Qué es: una app Android para conductores de Uber, DiDi e InDrive en Costa Rica. Lleva las cuentas del carro y dice cuánto te quedó de verdad (el neto), después de gasolina, peajes, mantenimiento y costos fijos.
- Nombre: Neto Smart (también escrito NetoSmart). Identificador de la app: ${sitio.idApp}. Sitio: ${url('/')}
- Quién la hace: Isaac, un conductor de plataforma en Costa Rica. Es independiente: no es de Uber, DiDi ni InDrive ni está afiliada a ellas.
- Planes: Gratis para siempre (todo a mano) y Neto Smart Pro, ${sitio.precioPremium}, con ${sitio.diasPrueba} días de prueba sin tarjeta (lo automático). Se paga con suscripción de Google Play.
- Dónde: Costa Rica. Android. iPhone todavía no.
- Privacidad: no guarda las contraseñas de las plataformas; las fotos de pantalla para leer montos no se guardan; la ubicación se usa solo para peajes, descanso, lavacar y kilómetros del turno, sin guardar por dónde anduvo.
${sitio.correoContacto ? `- Contacto: ${sitio.correoContacto}\n` : ''}
## Páginas

- [Qué es Neto Smart](${url('/que-es')}): la explicación completa: qué es, para quién, qué hace y qué no, planes, privacidad y contacto.
- [Inicio](${url('/')}): resumen, ejemplo de un día de diez horas, planes y preguntas frecuentes.
- [Descargar](${url('/descargar')}): cómo bajarla desde Google Play y qué te pide la primera vez.
- [Soporte](${url('/soporte')}): ayuda y qué hacer si algo no funciona.
- [Política de privacidad](${url('/privacidad')}): qué datos usa la app y cómo se borran.
- [Permiso de accesibilidad](${url('/accesibilidad')}): qué lee la app y qué no.
- [Términos de uso](${url('/terminos')}): condiciones de los planes Gratis y Pro.
- [Borrar mi cuenta](${url('/borrar-cuenta')}): cómo borrar la cuenta y todo lo que tiene adentro.

## English

Neto Smart is an Android app for rideshare drivers (Uber, DiDi, InDrive) in Costa Rica. It automatically records daily earnings, subtracts fuel, tolls, maintenance and fixed costs, and shows the driver's real net income. Free plan (manual entry) and Neto Smart Pro (automatic, monthly subscription in colones via Google Play). Independent; not affiliated with Uber, DiDi or InDrive.
`;
  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
