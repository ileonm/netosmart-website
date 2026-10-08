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
   * DOMINIO. netosmart.com (comprado en Spaceship, DNS en Cloudflare). Si
   * algun dia cambia, se cambia SOLO esta linea (y en Cloudflare Pages se
   * agrega el dominio personalizado).
   */
  dominio: 'https://netosmart.com',

  /**
   * Identificador de la app. Es el mismo en Android y en iPhone, y sale del
   * archivo app.json del repositorio de la app.
   */
  idApp: 'com.netosmart.app',

  /**
   * Ficha en Google Play. La direccion se arma sola con el identificador de
   * arriba, asi que no hay que copiarla de ningun lado.
   *
   * OJO: este enlace solo funciona cuando la ficha ya este publicada en
   * Google Play. Antes de eso, da pagina no encontrada.
   */
  urlPlayStore:
    'https://play.google.com/store/apps/details?id=com.netosmart.app',

  /**
   * Ficha en la App Store de iPhone. PENDIENTE: la version para iPhone
   * todavia no sale.
   *
   * Cuando salga, se pone aca la direccion de la ficha y el sitio solo
   * empieza a mostrar el boton de iPhone y a cambiar los textos que hoy
   * dicen "viene en camino". Es una sola linea.
   */
  urlAppStore: PENDIENTE as string | null,

  /**
   * Correo de contacto. Sale en soporte, en privacidad (para el borrado de
   * cuenta) y en el pie de todas las paginas.
   */
  correoContacto: 'contacto@netosmart.com' as string | null,

  /**
   * WhatsApp de soporte, solo los digitos y con el codigo de pais (506 es Costa
   * Rica). Sale en soporte y en el pie. Es para AYUDA con la app: no es una
   * forma de pago (el sitio solo dice "se paga desde la app") ni el canal para
   * pedir borrado o datos personales, que van por correo.
   */
  whatsapp: '50663420635' as string | null,

  /**
   * RESPONSABLE de los datos y del servicio: nombre de la persona o razon
   * social de la empresa. PENDIENTE.
   *
   * Bloquea: privacidad y terminos (Google los revisa y piden un responsable).
   * Puede ser el nombre de una persona, no hace falta una empresa.
   */
  // Persona fisica por ahora (5-oct): todavia no hay sociedad. Cuando exista,
  // se cambia por la razon social y la cedula juridica.
  responsable: 'Isaac Leon Murillo' as string | null,

  /**
   * PRECIO de Neto Smart Pro. Decidido: ₡2.500 al mes, el mismo que cobra
   * Google Play (suscripcion premium_mensual).
   *
   * El precio queda fijo para cada cuenta: si un dia sube, solo lo pagan las
   * cuentas nuevas. Si hay que cambiarlo, es esta linea y los textos que lo
   * mencionan salen solos.
   */
  precioPremium: '₡2.500 al mes',

  /** Dias de prueba de Pro, sin tarjeta. Una por persona. */
  diasPrueba: 14,

  /** Minutos que hay que quedarse en un lugar de descanso para que la app
   *  pregunte si se termina el turno. */
  minutosDescanso: 7,

  /** Minutos en un lavacar para que la app recuerde anotar el lavado. */
  minutosLavacar: 15,

  /**
   * Token de Cloudflare Web Analytics.
   * Se saca en el panel de Cloudflare: Analytics -> Web Analytics.
   * Mientras sea null, el sitio no carga ningun script de medicion.
   */
  tokenAnalytics: '44ec51eca021444a83f4c28feebd6d2b' as string | null,

  /** Fecha de la ultima revision de las paginas legales. */
  fechaLegal: '8 de octubre de 2026',

  /**
   * Simbolo de marca que acompana al nombre en el pie.
   *
   * Hoy va (TM), que es el que se usa para una marca que se esta usando pero
   * que todavia no esta registrada. NO cambiar a (R) hasta tener el registro
   * en el Registro de la Propiedad Industrial: usar (R) sin registro es
   * declarar algo falso.
   */
  simboloMarca: '\u2122',
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
  { texto: 'Términos', url: '/terminos' },
  { texto: 'Borrar mi cuenta', url: '/borrar-cuenta' },
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

/** Muestra un numero de WhatsApp legible: 50663420635 pasa a +506 6342 0635 */
export function telefonoLegible(digitos: string): string {
  // Espacios que no se separan (\u00A0): que el numero no se parta en dos renglones.
  return `+${digitos.slice(0, 3)}\u00A0${digitos.slice(3, 7)}\u00A0${digitos.slice(7)}`;
}

/** Enlace que abre WhatsApp con un primer mensaje ya escrito. */
export function urlWhatsapp(
  digitos: string,
  mensaje = 'Hola, necesito ayuda con Neto Smart.'
): string {
  return `https://wa.me/${digitos}?text=${encodeURIComponent(mensaje)}`;
}
