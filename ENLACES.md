# Enlaces para el lanzamiento

> **No repartas ninguno de estos enlaces antes de que la app esté publicada en
> Google Play para todo el público** (producción, no prueba cerrada). El sitio ya
> puede estar arriba, porque Google pide la privacidad y el borrado de cuenta,
> pero un enlace repartido antes lleva a un botón de descarga que todavía da
> error (ver PENDIENTES.md, punto 1).

El lanzamiento va grupo por grupo. Para saber cuál grupo trae gente y cuál no,
**cada grupo lleva su propio enlace**. Todos muestran exactamente la misma
página de inicio, pero en las estadísticas cada uno aparece por separado.

## Cómo se usa, en una línea

Copiá el enlace de la fila que corresponda y pegalo en ese grupo. Nada más.

## Los enlaces

> Estos enlaces usan el dominio propio, `netosmart.com`. Funcionan cuando el
> dominio esté conectado en Cloudflare Pages (sección 6 del README).

| Dónde lo vas a pegar | Enlace para copiar |
| --- | --- |
| Mensajes de WhatsApp uno a uno | `https://netosmart.com/g/wa-directo` |
| Grupo de WhatsApp 1 | `https://netosmart.com/g/wa-grupo-1` |
| Grupo de WhatsApp 2 | `https://netosmart.com/g/wa-grupo-2` |
| Grupo de Facebook 1 | `https://netosmart.com/g/fb-grupo-1` |
| Grupo de Facebook 2 | `https://netosmart.com/g/fb-grupo-2` |
| Publicación en el perfil personal | `https://netosmart.com/g/fb-perfil` |
| Grupo de Telegram 1 | `https://netosmart.com/g/tg-grupo-1` |
| Calcomanía o papelito en el carro | `https://netosmart.com/g/calcomania` |
| Compañeros, de boca en boca | `https://netosmart.com/g/boca-a-boca` |

## Cómo ver los resultados

1. Entrá a <https://dash.cloudflare.com>.
2. Menú **Analytics & Logs** > **Web Analytics**.
3. Buscá la lista **Top pages** (páginas más vistas).
4. Ahí vas a ver `/g/fb-grupo-1`, `/g/wa-grupo-2`, y así. El número al lado es
   cuánta gente entró por ese enlace.

Esto necesita que las estadísticas estén prendidas. Cómo prenderlas está en la
sección 7 del [README](README.md).

## Agregar un grupo nuevo

1. Abrí el archivo `src/config/canales.ts`.
2. Copiá una de las líneas de la lista y pegala abajo, cambiándole el nombre y
   la nota. Por ejemplo:

   ```ts
   { id: 'fb-grupo-3', nota: 'Grupo Uber Drivers Heredia' },
   ```

   El nombre va en minúscula, sin espacios, sin tildes y sin eñes.

3. Subí el cambio (sección 4 del README). En un par de minutos el enlace nuevo
   `https://netosmart.com/g/fb-grupo-3` ya funciona.

## Un par de consejos

- **Un enlace por grupo, siempre el mismo.** Si pegás el mismo enlace en dos
  grupos, no vas a poder distinguirlos después.
- **Poné la nota de cuál grupo es** en `canales.ts`, para acordarte en un mes.
- Estas páginas no salen en Google a propósito, para no competir con la página
  principal. Eso está bien y es a propósito.
- No se guarda ningún dato de quien entra. Solo se cuenta cuánta gente llegó por
  cada enlace.
