import type { TopicMeta } from '../types/topic'
import { content as t1 } from './tema-01-dron'

export const topics: TopicMeta[] = [
  { id: 'tema-1', num: 1, title: 'Rastreo y navegación de un dron de reparto', resource: 'Visualización de datos', content: t1 },
  { id: 'tema-2', num: 2, title: 'El salto del personaje: cómo los motores de juego falsean la gravedad', resource: 'Simulación interactiva' },
  { id: 'tema-3', num: 3, title: 'Gravedad artificial por rotación en hábitats espaciales', resource: 'Diagrama' },
  { id: 'tema-4', num: 4, title: 'Llantas de Fórmula 1: la ventana de temperatura y el agarre', resource: 'Visualización de datos' },
  { id: 'tema-5', num: 5, title: 'El resorte virtual detrás de un control háptico', resource: 'Multimedia con análisis' },
]