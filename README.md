# Sitio web de Neto Smart

Este es el sitio de **Neto Smart**, la app para conductores de plataforma en
Costa Rica. Son siete páginas: inicio, descargar, soporte, privacidad,
accesibilidad, términos y borrar mi cuenta.

Está escrito para que se pueda mantener sin saber programar. Casi todo lo que
hay que cambiar está en **un solo archivo**: `src/config/site.ts`.

---

## 0. Antes de publicar nada

**La app y el sitio salen juntos, cuando la app esté publicada en Google Play.**
Hasta entonces:

- no publiques el sitio en Cloudflare (sección 5),
- no conectes el dominio (sección 6),
- no repartas ningún enlace (`ENLACES.md`).

Lo que falta antes de ese día está en **[PENDIENTES.md](PENDIENTES.md)**, en
orden de qué bloquea qué. Leelo primero.

## 1. Lo que necesitás en la computadora

Solo una cosa: **Node.js versión 20 o más nueva**. Se baja de
<https://nodejs.org> (el botón que dice LTS).

Para comprobar que quedó instalado, abrí la terminal y escribí:

```
node --version
```

Si contesta algo como `v20.11.0` o más alto, ya está.

## 2. Ver el sitio en tu computadora

Abrí la terminal, metete en la carpeta del proyecto y escribí estos dos
comandos, uno por uno:

```
npm install
npm run dev
```

El segundo te va a decir algo como `http://localhost:4321`. Abrí esa dirección
en el navegador y ahí está el sitio. Mientras lo dejás corriendo, cada cambio
que guardés se ve al instante.

Para cerrarlo, en la terminal apretá `Ctrl + C`.

## 3. Dónde se cambia cada cosa

| Qué querés cambiar | Archivo |
| --- | --- |
| Precio de Premium, días de prueba, minutos de espera, correo, número de WhatsApp, nombre del responsable, dominio, enlaces a las tiendas | `src/config/site.ts` |
| Los grupos de WhatsApp y Facebook que se están midiendo | `src/config/canales.ts` |
| El texto del inicio (titular, ejemplo, tarjetas, preguntas) | `src/components/Landing.astro` |
| La tabla de Gratis contra Premium | `src/components/Precios.astro` |
| La página de descarga | `src/pages/descargar.astro` |
| Privacidad, accesibilidad, términos, soporte, borrar cuenta | `src/pages/*.astro` |
| Colores y tipografía | `src/styles/global.css` |
| El logo | `src/marca/` (ver `src/marca/LEEME.md`) |
| La tarjeta que se ve al compartir por WhatsApp | `public/og.png` |

Los textos están dentro de las etiquetas `<p>`, `<h1>`, `<h2>`, etc. Se cambia lo
que está entre las etiquetas, sin tocar las etiquetas.

### Cambiar el precio de Premium

1. Abrí `src/config/site.ts`.
2. Buscá la línea `precioPremium: '₡2.500 al mes',`.
3. Cambiá el texto entre comillas, con el formato de Costa Rica (punto de
   miles): por ejemplo `'₡3.000 al mes'`.
4. Guardá y subí el cambio (sección 4).

El inicio, descargar, las preguntas frecuentes y los términos toman el precio de
ahí, así que cambia en todos lados a la vez.

**Ojo:** esto cambia lo que dice el sitio, **no lo que cobra la app**. Y los
términos dicen que el precio queda fijo para cada cuenta que ya existe: si lo
subís, tiene que subir solo para las cuentas nuevas.

## 4. Subir los cambios

Cada vez que se sube un cambio a GitHub, Cloudflare vuelve a publicar el sitio
solo, en un par de minutos. No hay que hacer nada más. (Si todavía no lo
publicaste por primera vez, ver la sección 0.)

```
git add .
git commit -m "Cambié tal cosa"
git push
```

## 5. Publicarlo en Cloudflare Pages (la primera vez)

**No hagas esto hasta que la app esté en Google Play** (sección 0). Se hace una
sola vez.

1. Entrá a <https://dash.cloudflare.com> y creá una cuenta gratis si no tenés.
2. En el menú de la izquierda, buscá **Workers & Pages**.
3. Botón **Create** y luego la pestaña **Pages**.
4. **Connect to Git**. Cloudflare te va a pedir permiso para ver tus
   repositorios de GitHub. Dáselo.
5. Escogé el repositorio **netosmart-website**.
6. En la pantalla de configuración poné exactamente esto:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: dejalo en blanco
7. Botón **Save and Deploy**. Esperá un par de minutos.
8. Cuando termine, te da una dirección tipo
   `https://netosmart-website.pages.dev`. Abrila: ese ya es el sitio.

A partir de ahí, cada `git push` vuelve a publicar solo.

## 6. Conectar el dominio propio

Primero confirmá cuál dominio es tuyo: el correo es `contacto@netosmart.com` y
el plan de lanzamiento habla de `netosmart.app` (ver PENDIENTES.md, punto 6).

1. En Cloudflare, entrá al proyecto: **Workers & Pages** >
   **netosmart-website** > pestaña **Custom domains**.
2. **Set up a domain**, escribí el dominio y seguí los pasos que te indique.
3. Abrí `src/config/site.ts` y cambiá **la línea del dominio**:

   ```ts
   dominio: 'https://netosmart-website.pages.dev',
   ```

   por el dominio de verdad, por ejemplo:

   ```ts
   dominio: 'https://netosmart.app',
   ```

4. Subí el cambio (sección 4). Eso arregla solo las direcciones de las tarjetas
   de WhatsApp, el mapa del sitio y el `robots.txt`.
5. **Hacelo antes de repartir los enlaces de `ENLACES.md`.** Si el dominio
   cambia después, hay que repartirlos de nuevo.

## 7. Prender las estadísticas (Cloudflare Web Analytics)

Es gratis, no usa cookies y no identifica a nadie, así que no hace falta el
cartelito de cookies.

1. En Cloudflare, menú **Analytics & Logs** > **Web Analytics**.
2. **Add a site**, poné la dirección del sitio.
3. Cloudflare te muestra un código. Dentro de ese código hay un **token**: una
   tira larga de letras y números.
4. Abrí `src/config/site.ts` y cambiá:

   ```ts
   tokenAnalytics: PENDIENTE as string | null,
   ```

   por:

   ```ts
   tokenAnalytics: 'acá va el token que te dio Cloudflare' as string | null,
   ```

5. Subí el cambio. Mientras el token sea `PENDIENTE`, el sitio no carga ningún
   script de medición.

## 8. Saber cuál grupo trae gente

Está explicado en **[ENLACES.md](ENLACES.md)**, con la lista de enlaces lista
para copiar y pegar en cada grupo.

## 9. Cuando salga la versión de iPhone

Hoy el sitio dice que viene en camino, sin fecha. El día que exista la ficha en
la App Store:

1. Abrí `src/config/site.ts`.
2. Buscá `urlAppStore: PENDIENTE as string | null,` y pegá la dirección de la
   ficha entre comillas.
3. Subí el cambio.

El botón de iPhone aparece solo y los textos que decían «viene en camino»
cambian. Antes, mirá la decisión pendiente en PENDIENTES.md (punto 9): qué va a
hacer esa versión sin la lectura automática.

## 10. Lo que todavía hace falta llenar

Está en **[PENDIENTES.md](PENDIENTES.md)**, en orden de qué bloquea qué, con los
pasos de cada cosa. Incluye cómo poner las capturas de la app.

---

## Notas técnicas (para quien programe)

- Astro 5, TypeScript en modo estricto, sin framework de UI.
- CSS propio, sin Tailwind. El CSS va incrustado en cada página.
- **Cero JavaScript en el navegador.** Las preguntas frecuentes usan
  `<details>` nativo. El sitio se lee completo con JavaScript apagado.
- Tipografía del sistema, sin fuentes externas ni peticiones a otros dominios.
- Cada página pesa entre 22 y 52 KB ya con el CSS adentro (el inicio es la más
  pesada). La única imagen de la primera carga es el logo, de unos 4 KB.
- Lighthouse en móvil: 100 en rendimiento, accesibilidad, buenas prácticas y
  SEO en las siete páginas.
- Se revisó a 360 px y a 320 px con la letra del sistema hasta al 200%, sin que
  nada empuje la página de lado. Las tablas de varias columnas se apilan en
  pantallas angostas (clase `tabla-apilada` y la tabla de `Precios.astro`),
  porque una tabla que obliga a desplazarse de lado no pasa ese criterio.
- Los datos del negocio viven en `src/config/site.ts`. Lo que depende de un
  número (precio, días, minutos) se escribe ahí una vez y las páginas lo toman.
- `public/_headers` define las cabeceras de seguridad y de caché que aplica
  Cloudflare Pages.
- El logo es el mismo icono de la app. Los originales están en `src/marca/` y de
  ahí salen todas las imágenes.
- `herramientas/generar-imagenes.mjs` vuelve a generar `og.png`, los iconos y el
  logo del encabezado. No hace falta para desplegar: las imágenes ya están en el
  repositorio.
- La paleta sale de los colores medidos del logo: azul `#1a1a2e` y verde
  `#15c26b`, con una versión oscurecida del verde para el modo claro.
- La app se distribuye por Google Play. El enlace se arma solo con el
  identificador `com.netosmart.app`, así que no hay nada que copiar y pegar.
- El botón de descarga es la insignia oficial de Google Play
  (`public/google-play-es.png`), que no se modifica; el pie lleva la línea de
  atribución de marca que Google pide. Ver `src/marca/LEEME.md`.
- El encabezado muestra cuatro links de la página (Cómo funciona, Precio,
  Preguntas, Soporte) solo en pantalla ancha; en el celular queda el logo y el
  botón. Los links escondidos usan `display: none`, así que el teclado no los
  recorre.
- El número de WhatsApp de soporte está en `site.ts` (`whatsapp`, solo dígitos
  con código de país). De ahí salen el botón de soporte, el pie y los enlaces
  `wa.me` con el primer mensaje ya escrito. Si lo ponés en `null`, desaparece de
  todas las páginas.
