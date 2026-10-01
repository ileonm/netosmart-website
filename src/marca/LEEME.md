# Archivos originales de la marca

Estos dos archivos vienen del repositorio de la app
(`ileonm/platnings-app`, carpeta `assets/`, commit `2cf8d51`).

- `icono-original.png`: el icono cuadrado de la app, 1024 por 1024.
- `logo-redondo-original.png`: la versión redonda con fondo transparente.

De aquí salen todas las imágenes de `public/` (el icono del navegador, los
iconos de la pantalla de inicio y la tarjeta de WhatsApp). Para volver a
generarlas, ver `herramientas/generar-imagenes.mjs`.

Colores exactos del logo, medidos del archivo:

| Color | Código | Dónde se usa en el sitio |
| --- | --- | --- |
| Azul de fondo | `#1a1a2e` | `--azul` |
| Verde de la marca | `#15c26b` | `--verde` |
| Verde del aro | `#194c40` | solo en el logo |
| Blanco | `#ffffff` | texto sobre azul |

Si algún día cambia el logo de la app, se reemplazan estos dos archivos y se
vuelve a correr el generador.

## La insignia de Google Play

`public/google-play-es.png` es la insignia **oficial** de Google, en español
(«Descargar en Google Play»), tal como la entrega Google. **No se toca**: no se
redibuja, no se recolorea y no se le ponen sombras ni filtros. Si hay que
cambiarla, se vuelve a bajar la oficial del generador de insignias de Google
Play (<https://play.google.com/intl/es-419/badges/>).

Google pide además una línea de atribución de la marca, que ya está en el pie de
todas las páginas: «Google Play y el logotipo de Google Play son marcas
registradas de Google LLC».
