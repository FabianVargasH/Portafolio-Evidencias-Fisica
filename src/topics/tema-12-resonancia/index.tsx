// src/topics/tema-12-resonancia/index.tsx
import type { TopicContent } from '../../types/topic'
import * as text from './text'
import VideoClip from './VideoClip'
import ResonanceCurve from './ResonanceCurve'

export const content: TopicContent = {
  'caso-de-uso': text.casoDeUso,
  concepto: text.concepto,
  justificacion: text.justificacion,
  recurso: <><VideoClip /><ResonanceCurve />{text.analisis}{text.recursoNota}</>,
  fuentes: text.fuentes,
}