import type { TopicContent } from '../../types/topic'
import HabitatDiagram from './HabitatDiagram'
import { casoDeUso, concepto, justificacion, fuentes } from './text'

export const content: TopicContent = {
  'caso-de-uso': casoDeUso,
  concepto,
  justificacion,
  recurso: <HabitatDiagram />,
  fuentes,
}