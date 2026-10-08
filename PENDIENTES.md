# Lo que falta

Ordenado por lo que bloquea más. Nada de esto se inventó en el sitio: donde falta
un dato sale un marcador amarillo que dice **Pendiente**. Hoy no queda ninguno visible.

**La regla de fondo:** el sitio se publica ya (Google Play pide la privacidad y
el borrado de cuenta para revisar la app), pero ningún enlace se reparte hasta
que la app esté en Google Play para todo el público.

---

## Bloquea el lanzamiento

### 1. La ficha de Google Play tiene que estar viva

**Qué hacer:** cuando Google apruebe la app, abrí esta dirección en un teléfono
que **no sea el tuyo**:

`https://play.google.com/store/apps/details?id=com.netosmart.app`

Si abre la ficha de Neto Smart, listo. Si da «no encontrada», todavía no está
publicada o no se ve en Costa Rica.

**Por qué importa:** la insignia de Google Play y los enlaces de descarga del
sitio llevan ahí. Un conductor que toca «Descargar en Google Play» y cae en un
error no vuelve.

**Nada que cambiar en el código:** la dirección se arma sola con el
identificador `com.netosmart.app`.

### 2. El nombre del responsable: resuelto (5-oct)

Isaac Leon Murillo, como persona física. Cuando exista la sociedad, se cambia
la línea `responsable` de `src/config/site.ts` por la razón social y la cédula
jurídica, y se actualiza la fecha `fechaLegal`.

### 3. Cómo se paga Pro: resuelto (5-oct)

Pro se paga con una **suscripción mensual de Google Play** que se renueva sola
hasta que se cancela en Google Play. El sitio ya lo dice así en el inicio,
descargar, soporte, términos (6.5) y privacidad (11), con cómo cancelar, y que
borrar la cuenta no cancela la suscripción. Google Play y RevenueCat están en la
tabla de servicios externos.

### 4. La dirección de «borrar cuenta» en la ficha de Play: resuelto (7-oct)

En Play Console, la seguridad de los datos ya tiene
`https://netosmart.com/borrar-cuenta` como dirección para eliminar la cuenta.
La política de privacidad va en `https://netosmart.com/privacidad`.

### 5. El sitio contra la app: revisado el 5-oct

Se comparó cada línea de esta lista contra el código de la app del 5-oct y coincide:

- Lugares de descanso: hasta 5, círculo de 50 m, pregunta a los 7 minutos.
- Lavacares: hasta 5, círculo de 80 m; sin turno, pregunta a los 15 minutos.
- Vigía de peajes: 1 posición por segundo cerca de una caseta, 1 cada 10
  segundos lejos, con notificación fija.
- DiDi: el monto se lee con captura de pantalla (ML Kit, dentro del teléfono);
  el servicio de accesibilidad sigue declarando los tres paquetes, por las
  señales de estado del viaje. La tabla de paquetes está bien.
- Cédula: solo la huella; la huella sobrevive al borrado (tabla de historial),
  para que la prueba sea una por persona.
- Borrar la cuenta: Configuración → Mi perfil → Zona de peligro, al instante.
- Pro: 14 días de prueba sin tarjeta, una por persona; al vencer se escoge con
  cuál carro seguir.

Lo que se agregó al sitio el 5-oct, porque la app lo hace ahora: los correos
(códigos de 6 números, bienvenida, avisos de Pro y de seguridad, novedades solo
si se marcan), «un teléfono a la vez» (identificador de instalación, marca y
modelo), cambiar la contraseña, el paso «Leer tus ganancias» de la
configuración inicial, y Brevo, Google Play, RevenueCat y Cloudflare en la
tabla de servicios externos.

### 6. Dominio: resuelto

Es `netosmart.com`. Ya está en `src/config/site.ts` y en `ENLACES.md`. Falta
solo conectarlo en Cloudflare Pages (README, sección 6).

### 7. Token de estadísticas: puesto

El token de Cloudflare Web Analytics ya está en `tokenAnalytics` de
`src/config/site.ts`, así que el sitio carga el script de medición. Con eso se
sabe cuál grupo de WhatsApp o Facebook trajo gente, que es justamente lo que se
quiere medir en el lanzamiento. Es gratis y no usa cookies.

**Falta comprobarlo una vez publicado:** abrí `https://netosmart.com` en tu
teléfono y, unos minutos después, mirá Cloudflare > **Analytics & Logs** > **Web
Analytics**: tiene que aparecer una visita. Para ver que se separen los grupos,
abrí también `https://netosmart.com/g/wa-grupo-1` y confirmá que aparece como
otra página. Si a la hora no aparece nada, revisá que el nombre del sitio en
Cloudflare sea exactamente `netosmart.com`. Pasos de referencia en la sección 7
del README.

### 8. Quién contesta el WhatsApp de soporte: resuelto (7-oct)

El **+506 6342 0635** es un número dedicado de WhatsApp Business, no tu teléfono
personal. El sitio no promete tiempo de respuesta («puede tardar un poco, pero
llega»); si decidís uno, se pone en `src/pages/soporte.astro`. Para cambiar el
número: una línea en `site.ts` (`whatsapp`).

---

## Decisiones tuyas

### 9. Qué va a hacer la versión de iPhone

Hoy el sitio dice, en varios lugares, que iPhone «viene en camino» y que no hay
fecha, y que lo automático de la versión de Android depende de permisos que
iPhone no tiene. **No promete nada de lo automático para iPhone.**

Lo que falta decidir es qué va a hacer esa versión sin la lectura automática de
ganancias. Hasta que lo decidás, el sitio no puede prometer más.

**Cuando salga:** se llena `urlAppStore` en `src/config/site.ts` y el sitio solo
empieza a mostrar el botón de iPhone y a cambiar los textos que hoy dicen «viene
en camino». Es una línea. Para Google Play ya se usa la insignia oficial; para la
App Store hay que usar la insignia oficial de Apple (con sus propias reglas), que
se agrega ese día en lugar del botón de texto. (La razón de negocio, la cuenta de Apple y la Mac, no
está en el sitio y no hace falta que esté.)

### 10. Plazo de un borrado por correo: resuelto (5-oct)

30 días como máximo. Lo dicen `/borrar-cuenta` y la privacidad (sección 12).

### 11. Consulta legal sobre la base de datos

Falta una consulta legal sobre inscribir la base de datos ante la PRODHAB
(Ley 8968). El sitio cita esa ley en la política de privacidad y **no dice que
la base esté inscrita**, porque no lo está.

### 12. El registro de la marca

Hoy el pie dice **Neto Smart™**. El ™ es el símbolo de una marca que se usa pero
no está registrada, y se puede poner sin trámite. **No lo cambies a ® mientras
no tengás el registro** en el Registro de la Propiedad Industrial: usar ® sin
registro es declarar algo falso.

El día que salga: en `src/config/site.ts`, la línea `simboloMarca`, cambiala por
`'®'`. El pie cambia solo en todas las páginas.

### 13. `app-ads.txt`

Solo hace falta cuando la app muestre anuncios. Hoy no los muestra, y el sitio
no dice que los tenga. Si algún día hay anuncios, la política de privacidad
(sección 10) dice que se actualiza **antes**, y ahí también se agrega este
archivo.

---

## Bloquea que la gente confíe

### 14. Capturas de la app: resuelto (7-oct)

Las tres capturas del sitio están puestas y son pantallas reales: **Pro**
(`premium.webp`), **Hoy** (`turno-hoy.webp`) y **Mi garaje** (`mi-garaje.webp`),
en `public/capturas/`. Las capturas de la ficha de Google Play también están
listas.

- En «Hoy» se ven montos de un día real (₡22,769 de neto) y el modelo del carro,
  sin placa ni nombre. Se dejan así, a propósito.
- En «Mi garaje» las placas y el aceite están tapados con barras sólidas; las
  originales no están en el repositorio.
- La de **Pro** ya muestra **₡2.500**, con punto de miles, como la app desde la
  v3.11.145 (actualizada el 8-oct). **«Hoy»** (₡22,769) y **«Mi garaje»**
  (₡2,828 por barra) siguen con coma, porque son de antes de ese cambio. No es
  grave, pero si querés que las tres coincidan con la app, pasame capturas
  nuevas de esas dos y las reemplazo igual.
- La barra de estado de Android de las tres está dibujada (hora y batería fijas).
- **Opcional:** la pregunta «¿Quién lo paga?» del peaje de InDrive, junto al
  diagrama de peajes. Si la agregás, copiá el `<img>` de otra captura en
  `src/components/Landing.astro`.

### 15. Testimonios de conductores

**Dónde van:** `src/components/Landing.astro`, sección «Por qué confiar». Hay un
comentario en el código que marca el lugar.

No hay ninguno todavía y no se inventó ninguno. Cuando un conductor de verdad
diga algo y dé permiso para publicarlo con su nombre, va ahí.

---

## Lo que se decidió no poner, a propósito

- **El enlace al código de la app.** El repositorio `ileonm/platnings-app` es
  privado. Decir «el código está a la vista» y enlazar algo que le da error a
  todo el mundo es peor que no decir nada.
- **Descarga por APK.** Se quitó toda la instalación por archivo. Si hace falta
  repartir un APK para pruebas, que sea por aparte y no desde el sitio público.
- **Anuncios.** Están en pausa, sin fecha. El sitio no dice que la app los tenga.
- **SINPE como forma de pago, y WhatsApp como forma de pago.** El sitio dice solo
  «se paga desde la app» (punto 3). WhatsApp (+506 6342 0635) aparece como canal
  de ayuda en soporte y en el pie, y en la política de privacidad como servicio
  externo (hablar con soporte, mandar el diagnóstico o un comprobante).
- **Borrar la cuenta o pedir datos por WhatsApp.** Esos pedidos van por correo,
  desde la dirección de la cuenta: así se comprueba que la cuenta es de quien
  escribe y queda constancia escrita.
- **«No se comparten con terceros».** Esa frase ya no era exacta (la placa va al
  Registro Nacional; marca, modelo y año van a Anthropic). Ahora el sitio dice
  que los datos no se venden ni se usan para publicidad, y nombra los servicios
  externos uno por uno.
- **Fecha para iPhone**, y qué hará la versión de iPhone. El sitio dice de frente
  que no hay fecha.
- **Cantidad de usuarios.** El sitio dice que hoy la usa un conductor activo en
  San José, porque eso es lo que hay.
- **Cifras de ahorro o de ganancia.** El ejemplo del inicio está marcado como
  ilustrativo y dice que no es un promedio medido.
- **Que la marca no está registrada.** El pie lleva ™, pero el sitio no anuncia
  que no lo esté: decirlo solo invita a que alguien más corra a registrarla.
- **Teléfono, cédula jurídica y dirección.** No se inventó ninguno.
