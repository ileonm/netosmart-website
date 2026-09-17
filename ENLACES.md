# Enlaces para el lanzamiento

El lanzamiento va grupo por grupo. Para saber cuál grupo trae gente y cuál no,
**cada grupo lleva su propio enlace**. Todos muestran exactamente la misma
página de inicio, pero en las estadísticas cada uno aparece por separado.

## Cómo se usa, en una línea

Copie el enlace de la fila que corresponda y péguelo en ese grupo. Nada más.

## Los enlaces

> Mientras no se compre el dominio propio, estos enlaces empiezan con
> `netosmart-website.pages.dev`. Cuando se compre, el principio cambia solo y
> la parte de `/g/loquesea` se mantiene igual.

| Dónde lo va a pegar | Enlace para copiar |
| --- | --- |
| Mensajes de WhatsApp uno a uno | `https://netosmart-website.pages.dev/g/wa-directo` |
| Grupo de WhatsApp 1 | `https://netosmart-website.pages.dev/g/wa-grupo-1` |
| Grupo de WhatsApp 2 | `https://netosmart-website.pages.dev/g/wa-grupo-2` |
| Grupo de Facebook 1 | `https://netosmart-website.pages.dev/g/fb-grupo-1` |
| Grupo de Facebook 2 | `https://netosmart-website.pages.dev/g/fb-grupo-2` |
| Publicación en el perfil personal | `https://netosmart-website.pages.dev/g/fb-perfil` |
| Grupo de Telegram 1 | `https://netosmart-website.pages.dev/g/tg-grupo-1` |
| Calcomanía o papelito en el carro | `https://netosmart-website.pages.dev/g/calcomania` |
| Compañeros, de boca en boca | `https://netosmart-website.pages.dev/g/boca-a-boca` |

## Cómo ver los resultados

1. Entre a <https://dash.cloudflare.com>.
2. Menú **Analytics & Logs** > **Web Analytics**.
3. Busque la lista **Top pages** (páginas más vistas).
4. Ahí va a ver `/g/fb-grupo-1`, `/g/wa-grupo-2`, y así. El número al lado es
   cuánta gente entró por ese enlace.

Esto necesita que las estadísticas estén prendidas. Cómo prenderlas está en la
sección 7 del [README](README.md).

## Agregar un grupo nuevo

1. Abra el archivo `src/config/canales.ts`.
2. Copie una de las líneas de la lista y péguela abajo, cambiándole el nombre y
   la nota. Por ejemplo:

   ```ts
   { id: 'fb-grupo-3', nota: 'Grupo Uber Drivers Heredia' },
   ```

   El nombre va en minúscula, sin espacios, sin tildes y sin eñes.

3. Suba el cambio (sección 4 del README). En un par de minutos el enlace nuevo
   `https://netosmart-website.pages.dev/g/fb-grupo-3` ya funciona.

## Un par de consejos

- **Un enlace por grupo, siempre el mismo.** Si pega el mismo enlace en dos
  grupos, no va a poder distinguirlos después.
- **Ponga la nota de cuál grupo es** en `canales.ts`, para acordarse en un mes.
- Estas páginas no salen en Google a propósito, para no competir con la página
  principal. Eso está bien y es a propósito.
- No se guarda ningún dato de quien entra. Solo se cuenta cuánta gente llegó por
  cada enlace.
