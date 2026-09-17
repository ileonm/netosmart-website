# Lo que falta llenar

Ordenado por lo que bloquea más. Nada de esto se inventó en el sitio: donde
falta un dato, sale un marcador amarillo que dice **Pendiente**.

---

## Bloquea publicar el sitio

### 1. La ficha de Google Play tiene que estar viva

**Dónde se pone:** nada que poner. La dirección se arma sola con el
identificador de la app (`com.netosmart.app`), en `src/config/site.ts`.

**Qué bloquea:** todo. Los botones de descarga del sitio llevan a
`play.google.com/store/apps/details?id=com.netosmart.app`. Mientras la ficha no
esté publicada y visible en Costa Rica, ese enlace da página no encontrada.

**No repartás los enlaces de lanzamiento antes de comprobar que la ficha abre
desde un teléfono que no sea el tuyo.** Un conductor que hace clic en
"Descargar" y cae en un error de Google no vuelve.

### 2. Correo de contacto

**Dónde se pone:** `src/config/site.ts`, línea `correoContacto`.

**Qué bloquea:** la página de soporte, el borrado de cuenta en la política de
privacidad, y la publicación en Google Play (Google exige un contacto real en
la política). Aparece marcado como pendiente en tres lugares del sitio.

Sirve un correo normal, no hace falta uno del dominio.

### 3. Nombre o razón social del responsable

**Dónde se pone:** `src/pages/privacidad.astro` (sección 1) y
`src/pages/terminos.astro` (sección 1). Busque la palabra `Pendiente`.

**Qué bloquea:** la política de privacidad y los términos quedan incompletos
para el revisor de Google. Puede ser el nombre de una persona, no hace falta
una empresa.

---

## Bloquea que el sitio se vea bien compartido

### 4. Dominio propio

**Dónde se pone:** `src/config/site.ts`, línea `dominio`. Una sola línea.

Mientras tanto el sitio funciona con la dirección que da Cloudflare
(`netosmart-website.pages.dev`). Los enlaces de lanzamiento ya están hechos con
esa dirección, así que si el dominio cambia después hay que volver a repartir
los enlaces. Si se puede comprar antes del lanzamiento, mejor.

### 5. Token de estadísticas

**Dónde se pone:** `src/config/site.ts`, línea `tokenAnalytics`.

**Qué bloquea:** sin esto no se sabe cuál grupo de WhatsApp o Facebook trajo
gente, que es justamente lo que se quiere medir en el lanzamiento. Los pasos
están en la sección 7 del README. Es gratis.

---

## Decisiones que hay que tomar

### 6. Qué se promete de la versión para iPhone

Hoy el sitio dice, en tres lugares, que la versión de iPhone "viene en camino"
y que no hay fecha. Eso es lo seguro mientras no haya una.

Lo que falta decidir es **qué va a hacer esa versión**. La lectura automática de
ganancias usa un permiso de Android que en iPhone no existe, así que la app de
iPhone no va a poder leer los montos igual. Antes de anunciarla hay que decidir
si en iPhone se anota todo a mano, o si hay otro camino, y decirlo claro en el
sitio. Si se anuncia sin aclararlo, el conductor de iPhone la baja esperando
algo que no va a pasar.

**Cuando salga:** se llena `urlAppStore` en `src/config/site.ts` y el sitio solo
empieza a mostrar el botón de iPhone y a cambiar los textos que hoy dicen
"viene en camino". Es una línea.

### 7. Precio de la versión sin anuncios

**Dónde se pone:** `src/config/site.ts`, línea `precioPro`.

Sale marcado como pendiente en la pregunta "¿Cuánto cuesta?" del inicio y en la
sección 6 de los términos. El sitio ya dice que es gratis con anuncios y que va
a haber una versión de pago, que es lo honesto mientras no haya precio.

---

## Bloquea que la gente confíe

### 8. Captura de la app

**Dónde va:** `src/components/Landing.astro`, después de los tres pasos de
"Cómo funciona". Marcador de 320 por 640 px.

Tiene que ser la pantalla de resumen del turno cerrado, con el neto del día a
la vista. Es la única imagen que falta en el sitio, y es la prueba de que la
app hace lo que el titular promete.

**Cómo ponerla:** guarde la imagen en `public/capturas/`, en formato WebP, y
reemplace el bloque `<Marcador ... />` por:

```astro
<img
  src="/capturas/turno-cerrado.webp"
  width="320"
  height="640"
  loading="lazy"
  alt="Describa acá lo que se ve en la pantalla"
/>
```

### 9. Testimonios de conductores

**Dónde van:** `src/components/Landing.astro`, sección "Por qué confiar". Hay un
comentario en el código que marca el lugar.

No hay ninguno todavía y no se inventó ninguno. Cuando un conductor de verdad
diga algo y dé permiso para publicarlo con su nombre, va ahí.

---

## Lo que se decidió no poner, a propósito

- **El enlace al código de la app.** El repositorio `ileonm/platnings-app` es
  privado. Decir "el código está a la vista" y enlazar algo que le da error a
  todo el mundo es peor que no decir nada. Si algún día el repositorio se hace
  público, se puede volver a poner y es un buen argumento.
- **Descarga por APK.** Se quitó toda la instalación por archivo. Si alguna vez
  hace falta repartir un APK para pruebas, que sea por aparte y no desde el
  sitio público.
- **Cantidad de usuarios.** El sitio dice que hoy la usa un conductor activo en
  San José, porque eso es lo que hay.
- **Cifras de ahorro o de ganancia.** El ejemplo del inicio está marcado como
  ilustrativo y dice explícitamente que no es un promedio medido.
- **Fecha para la versión de iPhone.** El sitio dice de frente que no hay fecha.
- **Teléfono, cédula jurídica y dirección.** No se inventó ninguno. Si hacen
  falta después, se agregan en los términos.
