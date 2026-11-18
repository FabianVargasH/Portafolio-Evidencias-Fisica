// src/topics/tema-10-spring/index.tsx
import type { TopicContent } from '../../types/topic'
import * as text from './text'
import SpringSim from './SpringSim'

export const content: TopicContent = {
  'caso-de-uso': text.casoDeUso,
  concepto: text.concepto,
  justificacion: text.justificacion,
  recurso: <><SpringSim />{text.recursoNota}</>,
  fuentes: text.fuentes,
}