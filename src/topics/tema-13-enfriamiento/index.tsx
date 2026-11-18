// src/topics/tema-13-enfriamiento/index.tsx
import type { TopicContent } from '../../types/topic'
import * as text from './text'
import CoolingCircuit from './CoolingCircuit'

export const content: TopicContent = {
  'caso-de-uso': text.casoDeUso,
  concepto: text.concepto,
  justificacion: text.justificacion,
  recurso: <><CoolingCircuit />{text.recursoNota}</>,
  fuentes: text.fuentes,
}