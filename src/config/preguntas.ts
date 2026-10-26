import { sitio } from './site';

/**
 * Preguntas frecuentes del inicio.
 *
 * Son la UNICA fuente: el inicio las dibuja desde aca y los datos
 * estructurados (FAQPage) se arman desde aca, asi que lo que ve la gente y lo
 * que leen Google y las IA no se desfasa nunca. Cada parrafo de `respuesta`
 * puede llevar HTML simple (enlaces, <strong>).
 */
export interface Pregunta {
  pregunta: string;
  respuesta: string[];
  abierta?: boolean;
}

export const preguntas: Pregunta[] = [
  {
    pregunta: '¿Qué es Neto Smart?',
    abierta: true,
    respuesta: [
      'Es una app para conductores de Uber, DiDi e InDrive en Costa Rica. Lleva la cuenta de lo que ganás y de lo que gastás (gasolina, peajes, mantenimiento y costos fijos) y te dice cuánto te quedó de verdad al cerrar el turno: el neto. <a href="/que-es">Acá está la explicación completa</a>.',
    ],
  },
  {
    pregunta: '¿Para quién es?',
    respuesta: [
      'Para conductores de Uber, DiDi o InDrive en Costa Rica, con carro propio, alquilado o eléctrico. Si manejás en más de una plataforma, la app suma todo en un solo neto.',
    ],
  },
  {
    pregunta: '¿Neto Smart es de Uber, DiDi o InDrive?',
    respuesta: [
      'No. Es una app independiente, hecha por un conductor de plataforma en Costa Rica, y no está afiliada a Uber, DiDi ni InDrive. Los nombres se usan solo para explicar con cuáles apps funciona.',
    ],
  },
  {
    pregunta: '¿Necesita mi contraseña de Uber, DiDi o InDrive?',
    respuesta: [
      'No. Nunca te pide ni guarda las contraseñas de esas apps. La lectura automática de ganancias (parte de Pro) funciona con el permiso de accesibilidad de Android, que lee lo que ya se ve en pantalla.',
    ],
  },
  {
    pregunta: '¿Qué es «el neto»?',
    respuesta: [
      'Es lo que de verdad te queda después de descontar la gasolina, los peajes, el mantenimiento y los costos fijos (seguro, marchamo, la cuota del carro y lo que agregués). Es distinto de lo que te muestran las apps, que es lo que facturaste.',
    ],
  },
  {
    pregunta: '¿Por qué pide el permiso de accesibilidad?',
    respuesta: [
      'Es el permiso que le deja a la app leer el texto que aparece en la pantalla. Se usa solo en Uber, DiDi e InDrive, para ver cuánto ganaste y en qué momento del viaje vas, y anotarlo sin que lo tengás que hacer vos. Es parte de la lectura automática, o sea de Pro.',
      'Cualquier otra app que tengás abierta se descarta antes de mirarla. No lee mensajes, ni contraseñas, ni lo que tecleás. DiDi no muestra su monto como texto, así que ese se lee de otra forma (mirá la pregunta de abajo).',
      'Si no se lo querés dar, no se lo des. La app funciona igual y las ganancias las anotás a mano. <a href="/accesibilidad">Acá está la explicación completa</a>.',
    ],
  },
  {
    pregunta: '¿Por qué saca fotos de la pantalla de DiDi?',
    respuesta: [
      'DiDi no muestra su monto como texto, así que no se puede leer de otra forma. Con Pro y la lectura automática encendida, el servicio de accesibilidad saca fotos de la pantalla de DiDi (y solo de DiDi) cuando DiDi cambia de pantalla, sobre todo después de un viaje. De ahí lee el total del día y el cobro en efectivo, para anotarlos solo y preguntarte por el vuelto. Todo se lee <strong>dentro de tu teléfono</strong> (Google ML Kit): las fotos no se guardan ni se mandan a ningún lado.',
      'Se apaga apagando la lectura automática. «Leer DiDi» queda como respaldo por si no lo agarró. <a href="/privacidad#captura">Los detalles están en la política</a>.',
    ],
  },
  {
    pregunta: '¿Ven mis datos?',
    respuesta: [
      'Tus datos quedan en tu teléfono y en una cuenta que es tuya, protegida para que solo vos puedas leerla. No se venden ni se usan para publicidad. Fuera de tu cuenta, lo único que nos llega es lo que vos decidís mandar, como un diagnóstico.',
      'Algunos servicios externos reciben lo mínimo para hacer su trabajo (por ejemplo, la placa va al Registro Nacional para buscar tu carro), y están todos nombrados en la política. Tampoco se guarda un recorrido de por dónde anduviste, ni se manda tu ubicación en vivo a ningún servidor. <a href="/privacidad">Ver la política de privacidad</a>.',
    ],
  },
  {
    pregunta: '¿Usa mi ubicación todo el tiempo? ¿Me gasta la batería?',
    respuesta: [
      'Con el turno abierto y Pro, la app mira el GPS más seguido para darse cuenta de que cruzaste una caseta: una posición por segundo cuando estás cerca de una, una cada diez segundos cuando estás lejos. Mientras tanto ves una notificación fija que dice «Neto Smart está atento a los peajes». Al cerrar el turno, se apaga.',
      'Fuera del turno no se vigila nada, salvo los lavacares que marcaste, con la ubicación de bajo consumo de Android, sin encender el GPS. Usar el GPS más seguido gasta más batería que no usarlo: es el precio de que los peajes se detecten solos, y si no lo querés, apagás el permiso y los anotás a mano. Los datos casi no los toca.',
    ],
  },
  {
    pregunta: '¿Funciona sin internet?',
    respuesta: [
      'Sí. Lo que anotás manejando se guarda en el teléfono aunque andés sin señal, y se sincroniza solo cuando vuelve la conexión. No se pierde nada.',
    ],
  },
  {
    pregunta: '¿Cuánto cuesta?',
    respuesta: [
      `El plan Gratis es gratis para siempre: todo a mano, con la analítica básica. Pro, que lo hace solo, cuesta ${sitio.precioPremium}, y lo probás ${sitio.diasPrueba} días sin tarjeta.`,
      '<a href="#precio">Acá está qué incluye cada uno</a>. Se paga desde la app, con Google Play.',
    ],
  },
  {
    pregunta: '¿Qué pasa cuando vence Pro?',
    respuesta: [
      'No se borra nada, nunca. Volvés al plan gratis con todo tu historial. Si tenías varios carros, escogés con cuál seguís; los otros quedan guardados y vuelven si renovás. Un turno que empezó con Pro termina con Pro.',
      'La suscripción se renueva sola cada mes por Google Play, hasta que la cancelés ahí mismo (Google Play → Pagos y suscripciones). Y el precio queda fijo para tu cuenta; si un día sube, solo lo pagan las cuentas nuevas.',
    ],
  },
  {
    pregunta: '¿Por qué me pide la cédula?',
    respuesta: [
      `Solo para la prueba gratis de ${sitio.diasPrueba} días de Pro, que es una por persona. La cédula (o el DIMEX) es opcional en el perfil: si no querés probar Pro, no hace falta darla.`,
      'No guardamos el número: guardamos una huella cifrada que no se puede deshacer para recuperarlo. El nombre y la cédula quedan fijos; para cambiarlos, escribinos por soporte. <a href="/privacidad#cedula">Más en la política</a>.',
    ],
  },
  {
    pregunta: '¿Con la placa me llena los datos del carro?',
    respuesta: [
      'Lo intenta. La app consulta la placa en el Registro Nacional y, si responde, llena marca, modelo, año, forma, color y motor. Si el Registro no contesta, la consulta con un servicio de respaldo (Placa.co.cr), al que solo le manda la placa. Y si tampoco hay respuesta, lo llenás a mano: son cuatro campos.',
      'De lo que devuelve cualquiera de los dos guardamos solo los datos del vehículo; lo del dueño se descarta sin guardarse.',
    ],
  },
  {
    pregunta: '¿Sirve para Uber, DiDi e InDrive al mismo tiempo?',
    respuesta: [
      'Sí. Si manejás en las tres, la app suma lo de las tres en el mismo turno y te da un solo neto al final del día.',
    ],
  },
  {
    pregunta: '¿Qué pasa si cambio de teléfono?',
    respuesta: [
      'Nada se pierde. Lo que anotás queda guardado en tu cuenta, no solo en el teléfono. Instalás la app en el aparato nuevo, entrás con la misma cuenta y ahí están tus turnos, tus carros y tus apartados.',
      'La cuenta funciona en un teléfono a la vez: al entrar en el nuevo, el anterior se cierra solo (después de subir lo que tuviera pendiente) y te llega un correo avisando.',
    ],
  },
  {
    pregunta: '¿Puedo borrar mi cuenta?',
    respuesta: [
      'Sí, desde la app y al instante: Configuración, Mi perfil, Zona de peligro. Si ya no tenés la app, también se puede pedir sin ella. <a href="/borrar-cuenta">Acá están los pasos</a>.',
    ],
  },
  {
    pregunta: '¿Funciona en iPhone?',
    respuesta: [
      'Todavía no, pero viene en camino. Por ahora la app está en Google Play, para Android.',
      'No ponemos fecha porque no la tenemos, y tampoco prometemos todavía qué va a hacer: lo automático de la versión de Android depende de permisos que iPhone no tiene. Cuando la versión de iPhone esté lista, se anuncia acá mismo.',
    ],
  },
];
