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

### 4. La dirección de «borrar cuenta» en la ficha de Play

Google exige que la ficha tenga una página web donde se pueda pedir el borrado
de la cuenta sin tener la app. Esa página ya existe: `/borrar-cuenta`.

**Qué hacer:** en Play Console, donde Google pide la dirección web para eliminar
la cuenta (en la parte de seguridad de los datos), pegá
`https://netosmart.com/borrar-cuenta`. Y en el campo de política de privacidad,
`https://netosmart.com/privacidad`. **El sitio tiene que estar publicado antes
de mandar la app a revisión.**

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

### 8. Alguien tiene que contestar el WhatsApp de soporte

Desde ahora el sitio le dice al conductor que escriba al **+506 6342 0635**
(botón en soporte, y número en el pie). Una pregunta sin respuesta pesa más que
no tener canal.

- Si ese número es tu teléfono personal, queda **público**: cualquiera puede
  escribirte. WhatsApp Business (gratis) permite separarlo, y además trae mensaje
  de ausencia y horario.
- El sitio no promete tiempo de respuesta («puede tardar un poco, pero llega»).
  Si decidís uno, se pone en `src/pages/soporte.astro`.
- Si querés cambiar el número o quitarlo: una línea en `site.ts` (`whatsapp`).

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

### 14. Capturas de la app (están las tres principales, y hay una opcional)

Son pantallas reales de la app, no dibujos. Estado:

| Pantalla | Estado | Dónde va |
| --- | --- | --- |
| **Pro**, con la prueba de 14 días | **Lista, ya con el nombre Pro** (`public/capturas/premium.webp`, con la barra de Android dibujada) | En «Lo que hace», a la derecha |
| **Hoy**, con el neto del día a la vista | **Lista** (`public/capturas/turno-hoy.webp`), con el nombre del saludo tapado | Junto a «Cómo funciona» |
| **Mi garaje** (la lista de carros) | **Lista** (`public/capturas/mi-garaje.webp`), con las placas y el aceite tapados | En «Lo que hace», a la izquierda |
| La pregunta **«¿Quién lo paga?»** del peaje de InDrive, con sus tres botones | Opcional | Junto al diagrama de peajes |

**Cuál pantalla es «Mi garaje».** Son dos pantallas distintas dentro de lo mismo:
la **lista** de carros y el **formulario de agregar o editar** un carro. La que
está puesta es la **lista**: muestra dos carros, uno a gasolina y uno eléctrico,
el costo por barra o por punto de batería, el aceite y el botón de agregar, así
que respalda «varios carros» y «eléctricos de verdad». **No muestra la placa
llenando los datos**, que es lo que dice la otra frase de la tarjeta («con la
placa intentamos llenarte los datos»). Si algún día querés mostrar eso, hace
falta una captura del **formulario** ya lleno a partir de una placa.

**Los datos reales de esa captura están tapados.** La captura original traía dos
placas reales y la fecha y el kilometraje del aceite. Se taparon con barras
sólidas (no con desenfoque, que a veces se puede deshacer), y la original **no
está en el repositorio**: solo está la versión tapada. Siguen visibles las
marcas y modelos, los costos y el resto de la pantalla. Si preferís que no se
vean barras, sacá la captura de nuevo con un carro de prueba y la reemplazamos.

**Las tres capturas tienen la misma forma de teléfono (1440 por 3120) y la barra
de estado de Android está dibujada, no capturada.** Para que se vean como un
teléfono real, se les agregó arriba la hora, la señal, el wifi, la batería y el
punto de la cámara. Es decoración: la hora (10:35) y la batería son fijas, no
vienen de tu teléfono. Lo de adentro de cada pantalla sí es real. Si algún día
sacás las capturas con la barra de estado incluida, se pueden reemplazar tal
cual y se quita el dibujo.

**La captura de «Hoy».** Es la pantalla de inicio con el turno ya cerrado: el
neto en grande, el bruto, las horas, lo que sale por hora, lo de cada app y los
gastos desglosados. Se tapó con una barra sólida **solo tu nombre** del saludo
(«Buenas noches, ...»); la original no está en el repositorio. **Ojo con dos
cosas que sí se ven:** los montos son de un día real (₡22,769 de neto) y sale el
modelo del carro, sin placa. Si no querés mostrar montos tuyos, sacala de nuevo
con datos de prueba.

**Cómo ponerlas, paso a paso:**
1. Sacá la captura en el teléfono, con datos de prueba (no tu placa ni tus
   montos reales), en modo claro y con la barra de estado limpia. Recortá la
   barra de arriba y la de abajo para que quede casi 1 de ancho por 2 de alto.
2. Pasala a WebP (cualquier convertidor en línea sirve) a 516 píxeles de ancho, y
   guardala en `public/capturas/` con un nombre sin tildes ni espacios:
   `turno-hoy.webp`, `mi-garaje.webp`.
3. Abrí `src/components/Landing.astro` y buscá el bloque `<Marcador ... />` de
   esa pantalla.
4. Cambialo por esto, con el nombre del archivo y la altura que le toque (el
   alto sale de la proporción real de tu imagen; con 516 de ancho y 1015 de alto
   son 258 por 508):

   ```astro
   <img
     src="/capturas/mi-garaje.webp"
     width="258"
     height="508"
     loading="lazy"
     alt="Describí acá lo que se ve en la pantalla"
   />
   ```
5. Guardá y subí el cambio (sección 4 del README).

El texto de `alt` es lo que escucha una persona con lector de pantalla: describí
lo que se ve, no «captura de pantalla». Si los montos de la captura son de
ejemplo, agregá al lado una nota «datos de ejemplo», como la del resumen del
inicio.

**Google Play pide además sus propias capturas** para publicar la ficha: mínimo
dos de teléfono, y un gráfico destacado de 1024 por 500. Se pueden reusar estas
mismas.

**Una cosa que se ve en la captura de Pro** y conviene revisar en la app (el sitio
muestra la captura tal cual; la tarjeta del sitio con ese nombre está bien):
- En la captura, la tarjeta **«El turno se cierra al llegar a descansar»** empieza con «Y si
  arrancás un viaje sin turno abierto…»: parece que le falta la primera frase
  (la del lugar de descanso).
- Resuelto en la captura nueva: la app ya no dice «Ninguno se te olvida» ni «ya
  se paga solo». Ahora dice «Así no se te escapan» y «Con que te salve un viaje
  mal anotado o un par de peajes que se te iban a olvidar, ya lo recuperaste».

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
