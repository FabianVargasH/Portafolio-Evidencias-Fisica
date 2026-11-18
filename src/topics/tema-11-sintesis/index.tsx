// src/topics/tema-11-sintesis/index.tsx
import type { TopicContent } from '../../types/topic'
import * as text from './text'
import TimbreAnalysis from './TimbreAnalysis'

export const content: TopicContent = {
  'caso-de-uso': text.casoDeUso,
  concepto: text.concepto,
  justificacion: text.justificacion,
  recurso: <><TimbreAnalysis />{text.analisis}{text.recursoNota}</>,
  fuentes: text.fuentes,
}