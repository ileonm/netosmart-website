# Sitio web de Neto Smart

Este es el sitio de **Neto Smart**, la app para conductores de plataforma en
Costa Rica. Son siete páginas: inicio, descargar, soporte, privacidad,
accesibilidad, términos y borrar mi cuenta.

Está escrito para que se pueda mantener sin saber programar. Casi todo lo que
hay que cambiar está en **un solo archivo**: `src/config/site.ts`.

---

## 0. Antes de publicar nada

**El sitio se publica ya; los enlaces se reparten cuando la app esté en
Google Play para todo el público.** Google Play pide, para revisar la app, la
política de privacidad (`/privacidad`) y la página para borrar la cuenta
(`/borrar-cuenta`) en un sitio que funcione. Por eso:

- publicá el sitio en Vercel (sección 5) y conectá el dominio (sección 6)
  ahora,
- pero no repartas ningún enlace (`ENLACES.md`) hasta que la app esté en
  producción: antes de eso el botón de descarga lleva a una ficha que la gente
  todavía no puede ver.

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
| Precio de Pro, días de prueba, minutos de espera, correo, número de WhatsApp, nombre del responsable, dominio, enlaces a las tiendas | `src/config/site.ts` |
| Los grupos de WhatsApp y Facebook que se están midiendo | `src/config/canales.ts` |
| El texto del inicio (titular, ejemplo, tarjetas, preguntas) | `src/components/Landing.astro` |
| La tabla de Gratis contra Pro | `src/components/Precios.astro` |
| La página de descarga | `src/pages/descargar.astro` |
| Privacidad, accesibilidad, términos, soporte, borrar cuenta | `src/pages/*.astro` |
| Colores y tipografía | `src/styles/global.css` |
| El logo | `src/marca/` (ver `src/marca/LEEME.md`) |
| La tarjeta que se ve al compartir por WhatsApp | `public/og.png` |

Los textos están dentro de las etiquetas `<p>`, `<h1>`, `<h2>`, etc. Se cambia lo
que está entre las etiquetas, sin tocar las etiquetas.

### Cambiar el precio de Pro

1. Abrí `src/config/site.ts`.
2. Buscá la línea `precioPremium: '₡2.500 al mes',`.
3. Cambiá el texto entre comillas, con el formato de Costa Rica (punto de
   miles): por ejemplo `'₡3.000 al mes'`.
4. Guardá y subí el cambio (sección 4).

El inicio, descargar, las preguntas frecuentes y los términos toman el precio de
ahí, así que cambia en todos lados a la vez.

**Ojo:** esto cambia lo que dice el sitio, **no lo que cobra la app**. Lo que
se cobra es el precio de la suscripción en Play Console. Y los
términos dicen que el precio queda fijo para cada cuenta que ya existe: si lo
subís, tiene que subir solo para las cuentas nuevas.

## 4. Subir los cambios

Cada vez que se sube un cambio a GitHub, Vercel vuelve a publicar el sitio
solo, en un par de minutos. No hay que hacer nada más. (Si todavía no lo
publicaste por primera vez, ver la sección 0.)

```
git add .
git commit -m "Cambié tal cosa"
git push
```

## 5. Publicarlo en Vercel (la primera vez)

Se hace una sola vez. El sitio se publica en **Vercel**; el dominio y el correo
siguen en Cloudflare (sección 6). El archivo `vercel.json` ya trae todo lo que
Vercel necesita (cómo se construye el sitio, de dónde sale y las cabeceras de
seguridad), así que no hay que configurar nada a mano.

1. Entrá a <https://vercel.com> y tocá **Sign Up**. Escogé **Continue with
   GitHub**, así Vercel ve tus repositorios sin otra contraseña.
2. En el panel, botón **Add New...** y luego **Project**.
3. En la lista **Import Git Repository** buscá **netosmart-website** y tocá
   **Import**. Si no aparece, tocá **Adjust GitHub App Permissions** y dale
   acceso a ese repositorio.
4. En la pantalla de configuración:
   - **Framework Preset**: tiene que decir `Astro` (lo detecta solo).
   - **Build Command**, **Output Directory** e **Install Command**: dejalos como
     están. Vienen de `vercel.json` (`npm run build` y `dist`).
   - **Root Directory**: dejalo en blanco.
5. Botón **Deploy**. Esperá un par de minutos.
6. Cuando termine, te muestra una dirección tipo
   `https://netosmart-website.vercel.app`. Abrila: ese ya es el sitio.
7. **Revisá la rama de producción.** Entrá al proyecto y andá a **Settings** >
   **Git** > **Production Branch**. Tiene que decir
   `claude/neto-smart-website-gnhpqy`, que es la única rama del repositorio. Si
   dice otra cosa, cambiala y tocá **Save**. De esa rama sale lo que ve la
   gente; cualquier otra rama que algún día se cree queda como vista previa.

A partir de ahí, cada `git push` a esa rama vuelve a publicar solo.

**Ojo con el plan.** El plan gratis de Vercel (**Hobby**) es, según sus
condiciones, para uso personal y sin fines de lucro. Un sitio de una app que
cobra una suscripción es un uso comercial, y para eso Vercel pide el plan
**Pro** (de pago). Lo escribimos en PENDIENTES.md para que lo decidas con las
condiciones vigentes a la vista antes de repartir los enlaces.

## 6. Conectar el dominio propio

El dominio es **netosmart.com**. Se compró en Spaceship, **los DNS están en
Cloudflare** (ahí también está el correo) y `src/config/site.ts` ya lo tiene
puesto. Primero se le dice a Vercel que el dominio es suyo y después se apunta
el DNS en Cloudflare.

**En Vercel**

1. Proyecto **netosmart-website** > **Settings** > **Domains**.
2. Escribí `netosmart.com` y tocá **Add**. Escogé la opción recomendada, la que
   deja a `netosmart.com` como dirección principal.
3. Escribí `www.netosmart.com` y tocá **Add**. Escogé **Redirect to
   netosmart.com**, para que `www` lleve siempre a la dirección sin `www`.
4. Vercel va a mostrar, para cada dominio, un cartel rojo de **Invalid
   Configuration** con los registros DNS que faltan. Dejá esa pantalla abierta:
   los valores exactos están ahí.

**En Cloudflare** (<https://dash.cloudflare.com> > `netosmart.com` > **DNS** >
**Records**)

5. Borrá los dos registros **A** que dejó Spaceship (los de la página de
   estacionamiento): el de `netosmart.com` y el de `www` si existe.
6. Creá los registros que Vercel te indicó en el paso 4. Lo normal es un
   registro **A** para `netosmart.com` y un **CNAME** para `www`. Copiá el valor
   tal cual lo muestra Vercel.
7. En cada uno, el **Proxy status** tiene que decir **DNS only** (la nube
   **gris**, no la naranja). Con la nube naranja, el certificado de Vercel no se
   puede emitir bien.
8. **No toqués los registros MX ni los TXT.** Son los del correo (Cloudflare
   Email Routing) y los de Brevo. Si se borran, deja de llegar y de salir el
   correo.

**Para terminar**

9. Volvé a Vercel > **Settings** > **Domains** y esperá a que los dos dominios
   muestren **Valid Configuration**. Puede tardar unos minutos.
10. Abrí `https://netosmart.com`: tiene que mostrar el sitio, con candado. Abrí
    también `https://www.netosmart.com` y comprobá que te lleva a
    `https://netosmart.com`.

## 7. Prender las estadísticas (Cloudflare Web Analytics)

Las estadísticas siguen siendo de **Cloudflare Web Analytics**, aunque el sitio
esté en Vercel: funciona en cualquier hosting porque es un pequeño script que se
carga desde Cloudflare. Es gratis, no usa cookies y no identifica a nadie, así
que no hace falta el cartelito de cookies.

1. En Cloudflare, menú **Analytics & Logs** > **Web Analytics**.
2. **Add a site** y poné `netosmart.com` como dirección (**Hostname**).
3. Si Cloudflare te ofrece una instalación automática, no la uses: esa solo
   funciona con la nube naranja y acá el DNS está en gris. Escogé la opción del
   código para copiar (**Manage site** > **JS Snippet**).
4. Cloudflare te muestra un código. Dentro de ese código hay un **token**: una
   tira larga de letras y números.
5. Abrí `src/config/site.ts` y cambiá:

   ```ts
   tokenAnalytics: PENDIENTE as string | null,
   ```

   por:

   ```ts
   tokenAnalytics: 'acá va el token que te dio Cloudflare' as string | null,
   ```

6. Subí el cambio. Mientras el token sea `PENDIENTE`, el sitio no carga ningún
   script de medición.
7. Un par de minutos después de publicarlo, abrí el sitio en tu teléfono y mirá
   el panel de Web Analytics: tiene que aparecer una visita. Si a la hora no
   aparece nada, revisá que el token esté bien copiado y que el nombre del sitio
   en Cloudflare sea exactamente `netosmart.com`.

El script que carga el sitio es `static.cloudflareinsights.com/beacon.min.js`.
Vercel no le pone ninguna política de seguridad que lo bloquee (`vercel.json`
no define `Content-Security-Policy`). Si algún día se agrega una, hay que
permitirle a ese dominio y a `cloudflareinsights.com`.

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
- `vercel.json` define cómo se construye el sitio (`npm run build`, salida en
  `dist/`) y las cabeceras de seguridad y de caché que aplica Vercel. Antes
  estaban en `public/_headers`, que es un formato de Cloudflare Pages y Vercel
  ignora. `cleanUrls` y `trailingSlash: false` hacen que las páginas se abran
  sin barra al final (`/privacidad`), igual que las direcciones canónicas del
  sitio. No hay adaptador de Astro: es un sitio estático.
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
