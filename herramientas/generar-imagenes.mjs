/**
 * Genera las imagenes del sitio a partir del logo oficial de la app.
 *
 * Fuente:  src/marca/  (los originales, ver src/marca/LEEME.md)
 * Salida:  public/     (lo que usa el sitio)
 *
 * NO hace falta para desplegar el sitio: las imagenes ya estan guardadas en
 * public/ y subidas al repositorio. Esto es solo para volver a generarlas si
 * algun dia cambia el logo o el diseno de la tarjeta de WhatsApp.
 *
 * Para correrlo:
 *   npm install --no-save playwright
 *   npx playwright install chromium
 *   node herramientas/generar-imagenes.mjs
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

// Colores medidos del archivo del logo. No cambiar sin volver a medirlos.
const AZUL = '#1a1a2e';
const VERDE = '#15c26b';
const fuente =
  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const comoDato = (ruta) =>
  'data:image/png;base64,' + readFileSync(ruta).toString('base64');

const iconoCuadrado = comoDato('src/marca/icono-original.png');
const logoRedondo = comoDato('src/marca/logo-redondo-original.png');

const tarjeta = `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0}
  body{width:1200px;height:630px;background:${AZUL};color:#fff;
       font-family:${fuente};display:flex;flex-direction:column;
       justify-content:center;padding:0 78px;box-sizing:border-box}
  .marca{display:flex;align-items:center;gap:14px;margin-bottom:30px}
  .marca img{width:104px;height:104px;display:block;margin-left:-14px}
  .nombre{font-size:38px;font-weight:800;letter-spacing:-0.02em}
  h1{font-size:76px;line-height:1.08;margin:0 0 26px;font-weight:800;
     letter-spacing:-0.03em;max-width:17ch}
  .verde{color:${VERDE}}
  p{font-size:31px;line-height:1.35;color:#c9cfdd;margin:0;max-width:26ch}
  .barra{position:absolute;left:0;bottom:0;width:100%;height:12px;background:${VERDE}}
</style>
<div class="marca"><img src="${logoRedondo}" alt=""><div class="nombre">Neto Smart</div></div>
<h1>Trabajaste diez horas.<br><span class="verde">¿Cuánto te quedó?</span></h1>
<p>Gasolina, peajes y desgaste descontados. Para conductores en Costa Rica.</p>
<div class="barra"></div>`;

/** Redimensiona una imagen dejando el fondo transparente. */
const redimensionar = (dato, lado) => `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0;background:transparent}
  body{width:${lado}px;height:${lado}px}
  img{width:${lado}px;height:${lado}px;display:block}
</style><img src="${dato}" alt="">`;

/**
 * Recorta el margen vacio que trae el logo redondo y lo deja del tamano
 * pedido, para que el aro llene la caja. Las medidas del recorte estan
 * sacadas del archivo original: el aro va del pixel 87 al 424 de 512.
 */
const recortarLogo = (dato, lado) => {
  const original = 512;
  const desde = 87;
  const contenido = 338;
  const escala = lado / contenido;
  return `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0;background:transparent}
  body{width:${lado}px;height:${lado}px;overflow:hidden;position:relative}
  img{position:absolute;width:${original * escala}px;height:${original * escala}px;
      left:${-desde * escala}px;top:${-desde * escala}px;display:block}
</style><img src="${dato}" alt="">`;
};

const navegador = await chromium.launch({
  // En este entorno el Chromium viene instalado aparte. En una computadora
  // normal la variable no existe y Playwright usa el suyo.
  ...(process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : {}),
});

async function guardar(html, ancho, alto, salida, transparente = false) {
  const pagina = await navegador.newPage({
    viewport: { width: ancho, height: alto },
    deviceScaleFactor: 1,
  });
  await pagina.setContent(html);
  await pagina.screenshot({ path: salida, omitBackground: transparente });
  await pagina.close();
  console.log('  ' + salida);
}

console.log('Generando imagenes en public/');

// Tarjeta de vista previa para WhatsApp, Facebook y Telegram.
await guardar(tarjeta, 1200, 630, 'public/og.png');

// Icono del navegador y de la pantalla de inicio (el cuadrado de la app).
for (const lado of [32, 180, 192, 512]) {
  await guardar(
    redimensionar(iconoCuadrado, lado),
    lado,
    lado,
    `public/icono-${lado}.png`
  );
}

// Logo redondo recortado y con fondo transparente, para el encabezado.
await guardar(recortarLogo(logoRedondo, 96), 96, 96, 'public/logo-96.png', true);

await navegador.close();
console.log('Listo.');
