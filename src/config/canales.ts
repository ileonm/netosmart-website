/**
 * Canales de lanzamiento.
 *
 * Cada canal genera una pagina propia en /g/<id> que muestra exactamente el
 * mismo inicio. Sirve para saber cual grupo trae gente: en Cloudflare Web
 * Analytics cada canal aparece como su propia pagina en "Top pages".
 *
 * PARA AGREGAR UN GRUPO NUEVO: copie una linea de abajo, cambiele el id y la
 * nota, guarde y suba el cambio. El enlace nuevo queda listo en un par de
 * minutos. Los ids van en minuscula, sin espacios ni tildes.
 */
export const canales = [
  { id: 'wa-directo', nota: 'Mensajes de WhatsApp uno a uno' },
  { id: 'wa-grupo-1', nota: 'Grupo de WhatsApp (poner cual en esta nota)' },
  { id: 'wa-grupo-2', nota: 'Grupo de WhatsApp (poner cual en esta nota)' },
  { id: 'fb-grupo-1', nota: 'Grupo de Facebook (poner cual en esta nota)' },
  { id: 'fb-grupo-2', nota: 'Grupo de Facebook (poner cual en esta nota)' },
  { id: 'fb-perfil', nota: 'Publicacion en el perfil personal' },
  { id: 'tg-grupo-1', nota: 'Grupo de Telegram (poner cual en esta nota)' },
  { id: 'calcomania', nota: 'Calcomania o papelito dentro del carro' },
  { id: 'boca-a-boca', nota: 'Companeros de la fila del aeropuerto, etc.' },
] as const;

export type Canal = (typeof canales)[number]['id'];
