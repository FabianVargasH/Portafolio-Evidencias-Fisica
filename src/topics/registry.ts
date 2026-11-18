// src/topics/registry.ts
import type { TopicMeta } from '../types/topic'
import { content as t1 } from './tema-01-dron'
import { content as t2 } from './tema-02-salto'
import { content as t3 } from './tema-03-habitat'
import { content as t4 } from './tema-04-llantas'
import { content as t5 } from './tema-05-haptico'
import { content as t6 } from './tema-06-frenado'
import { content as t7 } from './tema-07-restitucion'
import { content as t8 } from './tema-08-reaccion'
import { content as t9 } from './tema-09-voyager'
import { content as t10 } from './tema-10-spring'
import { content as t11 } from './tema-11-sintesis'
import { content as t12 } from './tema-12-resonancia'
import { content as t13 } from './tema-13-enfriamiento'

export const topics: TopicMeta[] = [
  { id: 'tema-1', num: 1, title: 'Rastreo y navegación de un dron de reparto', resource: 'Visualización de datos', content: t1 },
  { id: 'tema-2', num: 2, title: 'El salto del personaje: cómo los motores de juego falsean la gravedad', resource: 'Simulación interactiva', content: t2 },
  { id: 'tema-3', num: 3, title: 'Gravedad artificial por rotación en hábitats espaciales', resource: 'Diagrama', content: t3 },
  { id: 'tema-4', num: 4, title: 'Llantas de Fórmula 1: la ventana de temperatura y el agarre', resource: 'Visualización de datos', content: t4 },
  { id: 'tema-5', num: 5, title: 'El resorte virtual detrás de un control háptico', resource: 'Multimedia con análisis', content: t5 },
  { id: 'tema-6', num: 6, title: 'Frenado regenerativo en un vehículo eléctrico', resource: 'Visualización de datos', content: t6 },
  { id: 'tema-7', num: 7, title: 'El coeficiente de restitución en un motor de videojuego: por qué la pelota rebota mal', resource: 'Simulación interactiva', content: t7 },
  { id: 'tema-8', num: 8, title: 'Ruedas de reacción: cómo un satélite se gira sin empujarse contra nada', resource: 'Diagrama', content: t8 },
  { id: 'tema-9', num: 9, title: 'Asistencia gravitatoria: cómo la Voyager ganó velocidad sin gastar combustible', resource: 'Visualización de datos', content: t9 },
  { id: 'tema-10', num: 10, title: 'Spring animations: el resorte amortiguado detrás de las animaciones de iOS y de Framer Motion', resource: 'Simulación interactiva', content: t10 },
  { id: 'tema-11', num: 11, title: 'Síntesis de sonido: armónicos, timbre y el sintetizador', resource: 'Multimedia con análisis', content: t11 },
  { id: 'tema-12', num: 12, title: 'Resonancia estructural: Tacoma Narrows y por qué las tropas rompen el paso al cruzar un puente', resource: 'Multimedia con análisis', content: t12 },
  { id: 'tema-13', num: 13, title: 'Enfriamiento líquido de un centro de datos: continuidad, caudal y Bernoulli', resource: 'Visualización de datos', content: t13 },
]