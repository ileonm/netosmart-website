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
