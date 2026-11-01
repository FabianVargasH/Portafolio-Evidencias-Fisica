// src/topics/tema-08-reaccion/index.tsx
import type { TopicContent } from '../../types/topic'
import * as text from './text'
import ReactionWheelDiagram from './ReactionWheelDiagram'

export const content: TopicContent = {
  'caso-de-uso': text.casoDeUso,
  concepto: text.concepto,
  justificacion: text.justificacion,
  recurso: <ReactionWheelDiagram />,
  fuentes: text.fuentes,
}