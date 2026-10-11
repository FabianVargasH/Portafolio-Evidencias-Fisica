# Portafolio de Física I · Avance 1

Portafolio individual del curso **Física I (FUN-18)**, Universidad CENFOTEC (sección FCV1, 2026-C3).
Autor: **Fabián Vargas Hidalgo**.

- **Página publicada:** [portafolio de fisica | Fabian Vargas](https://portafolio-fisica.vercel.app/)
- **Repositorio:** este mismo.

## Qué contiene

Cinco temas de física (cinemática, dinámica y leyes de conservación) aplicados a casos de Ingeniería del Software. Cada tema tiene un caso de uso, el concepto con su ecuación, una justificación frente a alternativas no físicas, un recurso de apoyo y sus fuentes.

| Tema | Caso | Recurso de apoyo |
|---|---|---|
| 1 | Dron de reparto (PX4 Autopilot) | Visualización de datos |
| 2 | Salto del personaje (Super Mario Bros.) | Simulación interactiva |
| 3 | Gravedad artificial (Elite Dangerous) | Diagrama |
| 4 | Llantas de F1 | Visualización de datos |
| 5 | Resorte virtual en un control háptico (DualSense) | Multimedia con análisis |

## Criterios de contenido

- Las explicaciones se basan en los módulos del curso, citados como [M1], [M2] y [M3], y en fuentes externas consultables, numeradas [1], [2], etc.
- Los cálculos, modelos y valores numéricos propios están rotulados como tales en la página. Cuando no hay datos medidos abiertos (por ejemplo, las llantas de F1), la página lo declara y presenta el modelo como ilustrativo.

## Tecnologías

React, TypeScript y Vite, con gráficas en recharts. Es un sitio estático, sin backend. La navegación usa `HashRouter`, así que no necesita configuración de rutas en el servidor.

## Cómo ejecutarlo

Requiere [Node.js](https://nodejs.org). Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Para generar la versión de producción (queda en `dist/`):

```bash
npm run build
```

## Estructura

```
src/
  app/         App.tsx, site.ts (datos de la portada)
  components/  layout/ (portada, navegación) y ui/ (citas, ecuaciones, gráficas)
  lib/physics/ modelos y cálculos de cada tema
  pages/       inicio y página de tema
  topics/      un directorio por tema, más registry.ts y sections.ts
public/        favicon y recursos
```