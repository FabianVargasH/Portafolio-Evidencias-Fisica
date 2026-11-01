import type { TopicContent } from '../../types/topic'
import RegenExplorer from './RegenExplorer'
import { casoDeUso, concepto, justificacion, fuentes } from './text'

export const content: TopicContent = {
  'caso-de-uso': casoDeUso,
  concepto,
  justificacion,
  recurso: <RegenExplorer />,
  fuentes,
}