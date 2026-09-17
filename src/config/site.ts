/**
 * Configuracion del sitio de Neto Smart.
 *
 * ESTE ES EL UNICO ARCHIVO QUE HAY QUE TOCAR PARA CAMBIAR DATOS DEL NEGOCIO.
 * Todo lo que diga PENDIENTE sale marcado en el sitio hasta que se llene.
 */

/** Valor todavia no definido por el dueno. Sale visible como marcador. */
export const PENDIENTE = null;

export const sitio = {
  nombre: 'Neto Smart',

  /**
   * DOMINIO. Todavia no hay dominio propio comprado.
   * Mientras tanto se usa la direccion que Cloudflare Pages asigna sola
   * al proyecto. Cuando se compre el dominio, se cambia SOLO esta linea
   * (y en Cloudflare Pages se agrega el dominio personalizado).
   */
  dominio: 'https://netosmart-website.pages.dev',

  descripcionCorta:
    'App para conductores de Uber, DiDi e InDrive en Costa Rica. Lleva la cuenta de gasolina, peajes y desgaste para que sepas cuanto te queda limpio.',

  /** Enlace que siempre apunta a la ultima version publicada del APK. */
  urlDescarga: 'https://github.com/ileonm/platnings-app/releases/latest',

  /** Codigo fuente publico de la app. */
  repoApp: 'https://github.com/ileonm/platnings-app',

  /** Peso aproximado del APK, para avisarle al usuario antes de bajarlo. */
  tamanoApk: '110 MB',

  /**
   * CORREO DE CONTACTO. PENDIENTE.
   * Bloquea: pagina de soporte, borrado de cuenta y la publicacion en
   * Google Play (la politica de privacidad necesita un contacto real).
   */
  correoContacto: PENDIENTE as string | null,

  /**
   * PRECIO de la version sin anuncios. PENDIENTE de decision.
   * Ejemplo de valor cuando se defina: '₡1.500 al mes'.
   */
  precioPro: PENDIENTE as string | null,

  /**
   * Token de Cloudflare Web Analytics.
   * Se saca en el panel de Cloudflare: Analytics -> Web Analytics.
   * Mientras sea null, el sitio no carga ningun script de medicion.
   */
  tokenAnalytics: PENDIENTE as string | null,

  /** Fecha de la ultima revision de las paginas legales. */
  fechaLegal: '17 de setiembre de 2026',
} as const;

/** Paquetes de Android que la app lee. Se usan en privacidad y accesibilidad. */
export const paquetesLeidos = [
  { app: 'Uber Driver', paquete: 'com.ubercab.driver' },
  { app: 'DiDi Driver', paquete: 'com.didiglobal.driver' },
  { app: 'InDrive', paquete: 'sinet.startup.inDriver' },
] as const;

export const navegacion = [
  { texto: 'Inicio', url: '/' },
  { texto: 'Descargar', url: '/descargar' },
  { texto: 'Soporte', url: '/soporte' },
  { texto: 'Privacidad', url: '/privacidad' },
  { texto: 'Accesibilidad', url: '/accesibilidad' },
  { texto: 'Terminos', url: '/terminos' },
] as const;

/** Formatea un numero como colones de Costa Rica: ₡12.500,50 */
export function colones(monto: number): string {
  const [entero, decimal] = Math.abs(monto).toFixed(2).split('.');
  const conPuntos = entero!.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const signo = monto < 0 ? '-' : '';
  return decimal === '00'
    ? `${signo}₡${conPuntos}`
    : `${signo}₡${conPuntos},${decimal}`;
}
