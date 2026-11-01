import type { TopicContent } from '../../types/topic'
import RestitutionExplorer from './RestitutionExplorer'
import { casoDeUso, concepto, justificacion, fuentes } from './text'

export const content: TopicContent = {
  'caso-de-uso': casoDeUso,
  concepto,
  justificacion,
  recurso: <RestitutionExplorer />,
  fuentes,
}