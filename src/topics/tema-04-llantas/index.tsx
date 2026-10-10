import type { TopicContent } from '../../types/topic'
import TireTempChart from './TireTempChart'
import TireLoadChart from './TireLoadChart'
import { casoDeUso, concepto, justificacion, fuentes } from './text'

export const content: TopicContent = {
  'caso-de-uso': casoDeUso,
  concepto,
  justificacion,
  recurso: (
    <>
      <TireTempChart />
      <TireLoadChart />
    </>
  ),
  fuentes,
}