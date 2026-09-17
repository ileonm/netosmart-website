/**
 * Genera las imagenes fijas del sitio (la tarjeta de WhatsApp y los iconos).
 * NO hace falta para desplegar el sitio: las imagenes ya estan guardadas en
 * public/ y subidas al repositorio. Esto es solo para volver a generarlas si
 * algun dia se cambia el diseno de la tarjeta o del icono.
 *
 * Para correrlo:
 *   npm install --no-save playwright
 *   npx playwright install chromium
 *   node herramientas/generar-imagenes.mjs
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const AZUL = '#1a1a2e';
const VERDE = '#00C48C';
const fuente =
  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const tarjeta = `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0}
  body{width:1200px;height:630px;background:${AZUL};color:#fff;
       font-family:${fuente};display:flex;flex-direction:column;
       justify-content:center;padding:0 78px;box-sizing:border-box}
  .marca{display:flex;align-items:center;gap:16px;margin-bottom:34px}
  .logo{width:60px;height:60px;border-radius:16px;background:${VERDE};color:${AZUL};
        display:flex;align-items:center;justify-content:center;
        font-size:38px;font-weight:800}
  .nombre{font-size:34px;font-weight:800;letter-spacing:-0.02em}
  h1{font-size:76px;line-height:1.08;margin:0 0 26px;font-weight:800;
     letter-spacing:-0.03em;max-width:17ch}
  .verde{color:${VERDE}}
  p{font-size:31px;line-height:1.35;color:#c9cfdd;margin:0;max-width:26ch}
  .barra{position:absolute;left:0;bottom:0;width:100%;height:12px;background:${VERDE}}
</style>
<div class="marca"><div class="logo">₡</div><div class="nombre">Neto Smart</div></div>
<h1>Trabajaste diez horas.<br><span class="verde">¿Cuánto te quedó?</span></h1>
<p>Gasolina, peajes y desgaste descontados. Para conductores en Costa Rica.</p>
<div class="barra"></div>`;

const icono = (lado) => `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0}
  body{width:${lado}px;height:${lado}px;background:${AZUL};display:flex;
       align-items:center;justify-content:center;font-family:${fuente}}
  span{color:${VERDE};font-size:${Math.round(lado * 0.62)}px;font-weight:800;
       line-height:1}
</style><span>₡</span>`;

// En este entorno el Chromium ya viene instalado aparte. Si la variable no
// esta puesta, Playwright usa el suyo, que es lo normal en una computadora.
const ejecutable = process.env.CHROMIUM_PATH;
const navegador = await chromium.launch(
  ejecutable ? { executablePath: ejecutable } : {}
);
await mkdir('public', { recursive: true });

const paginaTarjeta = await navegador.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await paginaTarjeta.setContent(tarjeta);
await paginaTarjeta.screenshot({ path: 'public/og.png' });

for (const lado of [180, 192, 512]) {
  const pagina = await navegador.newPage({
    viewport: { width: lado, height: lado },
    deviceScaleFactor: 1,
  });
  await pagina.setContent(icono(lado));
  await pagina.screenshot({ path: `public/icono-${lado}.png` });
}

await navegador.close();
console.log('Imagenes generadas en public/');
