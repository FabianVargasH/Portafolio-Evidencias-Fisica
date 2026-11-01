// src/topics/tema-09-voyager/index.tsx
import type { TopicContent } from '../../types/topic'
import * as text from './text'
import VoyagerChart from './VoyagerChart'

export const content: TopicContent = {
  'caso-de-uso': text.casoDeUso,
  concepto: text.concepto,
  justificacion: text.justificacion,
  recurso: <VoyagerChart />,
  fuentes: text.fuentes,
}