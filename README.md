# Sitio web de Neto Smart

Este es el sitio de **Neto Smart**, la app para conductores de plataforma en
Costa Rica. Son seis páginas: inicio, descargar, soporte, privacidad,
accesibilidad y términos.

Está escrito para que se pueda mantener sin saber programar. Casi todo lo que
hay que cambiar está en **un solo archivo**: `src/config/site.ts`.

---

## 1. Lo que necesita en la computadora

Solo una cosa: **Node.js versión 20 o más nueva**. Se baja de
<https://nodejs.org> (el botón que dice LTS).

Para comprobar que quedó instalado, abra la terminal y escriba:

```
node --version
```

Si contesta algo como `v20.11.0` o más alto, ya está.

## 2. Ver el sitio en su computadora

Abra la terminal, métase en la carpeta del proyecto y escriba estos dos
comandos, uno por uno:

```
npm install
npm run dev
```

El segundo le va a decir algo como `http://localhost:4321`. Abra esa dirección
en el navegador y ahí está el sitio. Mientras lo deja corriendo, cada cambio que
guarde se ve al instante.

Para cerrarlo, en la terminal apriete `Ctrl + C`.

## 3. Dónde se cambia cada cosa

| Qué quiere cambiar | Archivo |
| --- | --- |
| Dominio, correo de contacto, precio, peso del APK | `src/config/site.ts` |
| Los grupos de WhatsApp y Facebook que se están midiendo | `src/config/canales.ts` |
| El texto del inicio (titular, ejemplo, tarjetas, preguntas) | `src/components/Landing.astro` |
| La página de descarga | `src/pages/descargar.astro` |
| Privacidad, accesibilidad, términos, soporte | `src/pages/*.astro` |
| Colores y tipografía | `src/styles/global.css` |
| La tarjeta que se ve al compartir por WhatsApp | `public/og.png` |

Los textos están dentro de las etiquetas `<p>`, `<h1>`, `<h2>`, etc. Se cambia
lo que está entre las etiquetas, sin tocar las etiquetas.

## 4. Subir los cambios

Cada vez que se sube un cambio a GitHub, Cloudflare vuelve a publicar el sitio
solo, en un par de minutos. No hay que hacer nada más.

```
git add .
git commit -m "Cambié tal cosa"
git push
```

## 5. Publicarlo en Cloudflare Pages (la primera vez)

Esto se hace una sola vez.

1. Entre a <https://dash.cloudflare.com> y cree una cuenta gratis si no tiene.
2. En el menú de la izquierda, busque **Workers & Pages**.
3. Botón **Create** y luego la pestaña **Pages**.
4. **Connect to Git**. Cloudflare le va a pedir permiso para ver sus
   repositorios de GitHub. Déselo.
5. Escoja el repositorio **netosmart-website**.
6. En la pantalla de configuración ponga exactamente esto:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: déjelo en blanco
7. Botón **Save and Deploy**. Espere un par de minutos.
8. Cuando termine, le da una dirección tipo
   `https://netosmart-website.pages.dev`. Ábrala: ese ya es el sitio.

A partir de ahí, cada `git push` vuelve a publicar solo.

## 6. Conectar el dominio propio (cuando se compre)

1. En Cloudflare, entre al proyecto: **Workers & Pages** >
   **netosmart-website** > pestaña **Custom domains**.
2. **Set up a domain**, escriba el dominio y siga los pasos que le indique.
3. Abra `src/config/site.ts` y cambie **la línea del dominio**:

   ```ts
   dominio: 'https://netosmart-website.pages.dev',
   ```

   por el dominio de verdad, por ejemplo:

   ```ts
   dominio: 'https://netosmart.cr',
   ```

4. Suba el cambio (sección 4). Eso arregla solo las direcciones de las tarjetas
   de WhatsApp, el mapa del sitio y el `robots.txt`.

## 7. Prender las estadísticas (Cloudflare Web Analytics)

Es gratis, no usa cookies y no identifica a nadie, así que no hace falta el
cartelito de cookies.

1. En Cloudflare, menú **Analytics & Logs** > **Web Analytics**.
2. **Add a site**, ponga la dirección del sitio.
3. Cloudflare le muestra un código. Dentro de ese código hay un
   **token**: una tira larga de letras y números.
4. Abra `src/config/site.ts` y cambie:

   ```ts
   tokenAnalytics: PENDIENTE as string | null,
   ```

   por:

   ```ts
   tokenAnalytics: 'aquí va el token que le dio Cloudflare' as string | null,
   ```

5. Suba el cambio. Mientras el token sea `PENDIENTE`, el sitio no carga ningún
   script de medición.

## 8. Saber cuál grupo trae gente

Está explicado en **[ENLACES.md](ENLACES.md)**, con la lista de enlaces lista
para copiar y pegar en cada grupo.

## 9. Lo que todavía hace falta llenar

Está en **[PENDIENTES.md](PENDIENTES.md)**, en orden de qué bloquea qué.

---

## Notas técnicas (para quien programe)

- Astro 5, TypeScript en modo estricto, sin framework de UI.
- CSS propio, sin Tailwind. El CSS va incrustado en cada página.
- **Cero JavaScript en el navegador.** Las preguntas frecuentes usan
  `<details>` nativo. El sitio se lee completo con JavaScript apagado.
- Tipografía del sistema, sin fuentes externas ni peticiones a otros dominios.
- Cada página pesa entre 17 y 25 KB ya con el CSS adentro.
- Lighthouse en móvil: 100 en rendimiento, accesibilidad, buenas prácticas y
  SEO en las seis páginas.
- `public/_headers` define las cabeceras de seguridad y de caché que aplica
  Cloudflare Pages.
- `herramientas/generar-imagenes.mjs` vuelve a generar `og.png` y los iconos.
  No hace falta para desplegar: las imágenes ya están en el repositorio.
