# Lo que falta

Ordenado por lo que bloquea más. Nada de esto se inventó en el sitio: donde falta
un dato sale un marcador amarillo que dice **Pendiente**. Hoy hay **uno solo**
visible, el del responsable (punto 2).

**La regla de fondo: la app y el sitio salen juntos, cuando la app esté
publicada en Google Play.** Antes de eso no se despliega el sitio, no se conecta
el dominio y no se reparte ningún enlace.

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

### 2. El nombre del responsable

**Qué hacer:**
1. Abrí el archivo `src/config/site.ts`.
2. Buscá la línea `responsable: PENDIENTE as string | null,`.
3. Cambiala por tu nombre o el de la empresa, entre comillas:

   ```ts
   responsable: 'Tu Nombre Completo' as string | null,
   ```
4. Guardá y subí el cambio (sección 4 del README).

**Qué bloquea:** la privacidad y los términos quedan incompletos para el
revisor de Google. Puede ser el nombre de una persona; no hace falta empresa.
Cuando lo cambiés, desaparece el último marcador amarillo del sitio.

### 3. Cómo se paga Premium en la versión de la tienda (hay que confirmarlo)

El sitio dice solo «**se paga desde la app**», a propósito. No nombra SINPE.
WhatsApp aparece como canal de **ayuda**, no como forma de pago.

Google Play obliga a cobrar las compras dentro de la app con su propio sistema
de pagos. Hoy el pago es por SINPE Móvil con comprobante por WhatsApp, y en la
versión de la tienda puede terminar siendo por Google Play. **Confirmalo antes
de lanzar.**

Si el pago termina siendo por Google Play, hay que revisar estos textos, porque
dicen cosas que dejarían de ser ciertas:
- `src/pages/privacidad.astro`, sección 11 (**Pagos**): dice que «algunos pagos
  los confirma una persona del equipo», y agregar a Google Play en la tabla de
  la sección 10.
- `src/pages/terminos.astro`, sección 6.5.
- La tabla de servicios externos de privacidad (sección 10).

### 4. La dirección de «borrar cuenta» en la ficha de Play

Google exige que la ficha tenga una página web donde se pueda pedir el borrado
de la cuenta sin tener la app. Esa página ya existe: `/borrar-cuenta`.

**Qué hacer:** en Play Console, donde Google pide la dirección web para eliminar
la cuenta (está en la parte de seguridad de los datos), pegá:

`<tu dominio>/borrar-cuenta`

Y en el campo de política de privacidad, `<tu dominio>/privacidad`. El dominio es
el del punto 6: no lo pegues hasta que ese punto esté resuelto.

### 5. Comprobar que el sitio dice lo mismo que hace la app

Esta es la lista más importante antes de mandar la app a revisión. **El
repositorio de la app que pude leer termina el 23 de setiembre y no tiene
varias de las cosas que el sitio ahora describe**: salieron de tu mensaje del 1
de octubre. Los números están puestos tal cual los diste. Antes de enviar a
Google, alguien tiene que confirmar cada línea contra la versión que se sube:

| Qué dice el sitio | Dónde |
| --- | --- |
| Lugares de descanso: hasta 5, círculo de 50 m, pregunta a los 7 minutos | privacidad 5.2, inicio, soporte, `site.ts` |
| Casetas y lavacares: círculo de 80 m; lavacar pregunta a los 15 minutos; hasta 5 lavacares | privacidad 5.2, inicio, soporte, `site.ts` |
| Vigía de peajes: con turno abierto y Premium, 1 posición por segundo cerca de una caseta y 1 cada 10 segundos lejos; notificación fija «Neto Smart está atento a los peajes»; se apaga al cerrar el turno | privacidad 5.1, inicio, soporte |
| Los lavacares se vigilan también fuera del turno, con la ubicación de bajo consumo, sin encender el GPS, y es lo único que se vigila sin turno | privacidad 5.2, inicio |
| Los lugares que se marcan se guardan con la configuración (en la cuenta) | privacidad 5.3 |
| Cédula o DIMEX opcional; no se guarda el número, sino una huella cifrada irreversible; nombre y cédula quedan fijos | privacidad 7, terminos 6.3, inicio |
| La huella de la cédula **sobrevive** al borrado de la cuenta | privacidad 7, `/borrar-cuenta` |
| Anthropic recibe solo marca, modelo, año y tipo de energía; el Registro Nacional recibe la placa y de lo que devuelve solo se guardan datos del vehículo (sin número de serie) | privacidad 10 |
| El registro de diagnóstico se guarda en el teléfono y solo sale con el botón «Enviar diagnóstico» | privacidad 6, accesibilidad, soporte |
| Borrar la cuenta: Configuración, Mi perfil, Zona de peligro, al instante | privacidad 12, `/borrar-cuenta`, soporte |
| Premium: ₡2.500 al mes, 14 días de prueba sin tarjeta, una por persona, precio fijo por cuenta, sin renovación automática, al vencer no se borra nada, un turno con Premium termina con Premium | inicio, descargar, términos 6 |
| Con varios carros, al vencer se escoge con cuál seguir y los otros vuelven al renovar | inicio, soporte, términos 6.6 |

**Lo que sí se comprobó en el código de la app** (el 23 de setiembre): la
captura de DiDi mira la pantalla cada 1,5 segundos, se detiene sola a los 25
segundos y corre como servicio en primer plano de tipo captura de pantalla, con
el texto leído por Google ML Kit dentro del teléfono.

**Dos cosas que no coinciden del todo con tu mensaje, para que decidás:**
- Dijiste que DiDi se lee por captura y no por accesibilidad. En el código que
  vi, el servicio de accesibilidad **todavía declara el paquete de DiDi**
  (`accessibility_service_config.xml`) y lee de él señales de estado del viaje.
  Por eso el sitio dice que **el monto** de DiDi no se lee por accesibilidad,
  sin decir que accesibilidad ya no lo toca, y la tabla de paquetes de
  `/accesibilidad` y de privacidad sigue listando los tres. **Si en la versión
  nueva ya sacaste DiDi del servicio, hay que sacarlo de la tabla**: está en
  `src/config/site.ts`, en la lista `paquetesLeidos`.
- La propia app marcaba la captura de ganancias como «beta» el 23 de
  setiembre. El sitio dejó de decir «todavía está en pruebas». Si sigue siendo
  beta, conviene volver a decirlo.

### 6. Dominio

El correo es `contacto@netosmart.com` y el plan de lanzamiento habla de
`netosmart.app`. **Confirmá cuál de los dos es tuyo** antes de repartir enlaces.

**Qué hacer** cuando lo tengas: sección 6 del README (una línea en `site.ts` y
agregar el dominio en Cloudflare Pages).

**Por qué antes de repartir:** los enlaces de `ENLACES.md` están hechos con la
dirección de Cloudflare (`netosmart-website.pages.dev`). Si el dominio cambia
después de repartirlos, hay que repartirlos de nuevo.

### 7. Token de estadísticas

Sin esto no sabés cuál grupo de WhatsApp o Facebook trajo gente, que es
justamente lo que se quiere medir en el lanzamiento. Pasos en la sección 7 del
README. Es gratis y no usa cookies.

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

### 10. En cuánto tiempo se atiende un borrado por correo

`/borrar-cuenta` dice que se contesta por correo cuando esté hecho, y **no
promete un plazo**, porque no está decidido. Google suele querer uno. Conviene
decidir un número de días y agregarlo en esa página. Desde la app el borrado es
instantáneo, así que esto solo aplica a quien ya no tiene la app.

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

### 14. Capturas de la app (falta una, y hay una opcional)

Son pantallas reales de la app, no dibujos. Estado:

| Pantalla | Estado | Dónde va |
| --- | --- | --- |
| **Premium**, con la prueba de 14 días | **Lista** (`public/capturas/premium.webp`) | En «Lo que hace», a la derecha |
| **Resumen del día / turno cerrado**, con el neto a la vista | Falta | Junto a «Cómo funciona» |
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

**Cómo ponerlas, paso a paso:**
1. Sacá la captura en el teléfono, con datos de prueba (no tu placa ni tus
   montos reales), en modo claro y con la barra de estado limpia. Recortá la
   barra de arriba y la de abajo para que quede casi 1 de ancho por 2 de alto.
2. Pasala a WebP (cualquier convertidor en línea sirve) a 516 píxeles de ancho, y
   guardala en `public/capturas/` con un nombre sin tildes ni espacios:
   `turno-cerrado.webp`, `mi-garaje.webp`.
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

**Tres cosas que se ven en la captura de Premium** y conviene revisar en la app
(el sitio las muestra tal cual):
- Los montos salen con coma: **«₡2,500»** en Premium y **«₡2,828 por barra»** en
  Mi garaje. El sitio usa **«₡2.500»**, con punto, que es el formato de Costa
  Rica. Y en la misma pantalla de Mi garaje el kilometraje sale con punto
  (por ejemplo, **«123.456 km»**), así que la app mezcla los dos formatos. Conviene que diga lo
  mismo en todos lados.
- La tarjeta **«El turno se cierra al llegar a descansar»** empieza con «Y si
  arrancás un viaje sin turno abierto…»: parece que le falta la primera frase
  (la del lugar de descanso).
- La app dice «Ninguno se te olvida» (peajes) y «ya se paga solo» (el precio).
  El sitio evita las dos: no promete que ningún peaje se escape, y no dice que
  Premium se pague solo. Si Google o un conductor las leen literalmente, son
  frases que se pueden discutir.

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
