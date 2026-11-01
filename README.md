# Portafolio de Física I · Avance 2

Portafolio individual del curso **Física I (FUN-18)**, Universidad CENFOTEC (sección FCV1, 2026-C3).

Autor: **Fabián Vargas Hidalgo**.

- **Página publicada:** [portafolio-fisica.vercel.app](https://portafolio-fisica.vercel.app/)
- **Repositorio:** este mismo.

## Qué contiene

Nueve temas de física (cinemática, dinámica, leyes de conservación y gravitación) aplicados a casos de Ingeniería del Software. Cada tema tiene un caso de uso, el concepto con su ecuación, una justificación frente a alternativas no físicas, un recurso de apoyo y sus fuentes.

| Tema | Caso | Recurso de apoyo |
|---|---|---|
| 1 | Dron de reparto (PX4 Autopilot) | Visualización de datos |
| 2 | Salto del personaje (Super Mario Bros.) | Simulación interactiva |
| 3 | Gravedad artificial (Elite Dangerous) | Diagrama |
| 4 | Llantas de F1 | Visualización de datos |
| 5 | Resorte virtual en un control háptico (DualSense) | Multimedia con análisis |
| 6 | Frenado regenerativo (Nissan Leaf, ciclo UDDS) | Visualización de datos |
| 7 | Coeficiente de restitución (Box2D) | Simulación interactiva |
| 8 | Ruedas de reacción (Hubble) | Diagrama |
| 9 | Asistencia gravitatoria (Voyager 2) | Visualización de datos |

## Criterios de contenido

- Las explicaciones se basan en los módulos del curso, citados como [M1], [M2] y [M3], y en fuentes externas consultables, numeradas [1], [2], etc. dentro de cada tema.
- Los cálculos, modelos y valores numéricos propios están rotulados como tales en la página. Cuando no hay datos medidos abiertos o los valores son supuestos (por ejemplo, las llantas de F1 o las inercias del Tema 8), la página lo declara.
- Los datos del Tema 9 vienen de JPL Horizons: el texto crudo está en `data/horizons-voyager2.txt` y `scripts/convert-horizons.mjs` calcula la rapidez y genera `src/lib/physics/voyager2Data.ts`.

## Tecnologías

React, TypeScript y Vite, con gráficas en recharts. Es un sitio estático, sin backend. La navegación usa `HashRouter`, así que no necesita configuración de rutas en el servidor.

## Cómo ejecutarlo

Requiere [Node.js](https://nodejs.org). Desde la carpeta del proyecto:

    npm install
    npm run dev

Para generar la versión de producción (queda en `dist/`):

    npm run build

## Estructura

    data/        datos crudos (JPL Horizons)
    scripts/     scripts de conversión de datos
    src/
      app/         App.tsx, site.ts (datos de la portada)
      components/  layout/ (portada, navegación) y ui/ (citas, ecuaciones, gráficas)
      lib/physics/ modelos y cálculos de cada tema
      pages/       inicio y página de tema
      topics/      un directorio por tema, más registry.ts y sections.ts
    public/        favicon y recursos