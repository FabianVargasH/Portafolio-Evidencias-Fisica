import type { TopicMeta } from '../types/topic'
import { content as t1 } from './tema-01-dron'
import { content as t2 } from './tema-02-salto'
import { content as t3 } from './tema-03-habitat'
import { content as t4 } from './tema-04-llantas'
import { content as t5 } from './tema-05-haptico'

export const topics: TopicMeta[] = [
  { id: 'tema-1', num: 1, title: 'Rastreo y navegación de un dron de reparto', resource: 'Visualización de datos', content: t1 },
  { id: 'tema-2', num: 2, title: 'El salto del personaje: cómo los motores de juego falsean la gravedad', resource: 'Simulación interactiva', content: t2 },
  { id: 'tema-3', num: 3, title: 'Gravedad artificial por rotación en hábitats espaciales', resource: 'Diagrama', content: t3 },
  { id: 'tema-4', num: 4, title: 'Llantas de Fórmula 1: la ventana de temperatura y el agarre', resource: 'Visualización de datos', content: t4 },
  { id: 'tema-5', num: 5, title: 'El resorte virtual detrás de un control háptico', resource: 'Multimedia con análisis', content: t5  },
  
]