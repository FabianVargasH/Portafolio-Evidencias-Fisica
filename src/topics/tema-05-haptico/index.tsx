import type { TopicContent } from '../../types/topic'
import VideoClip from './VideoClip'
import HapticChart from './HapticChart'
import { casoDeUso, concepto, analisis, justificacion, fuentes } from './text'

export const content: TopicContent = {
  'caso-de-uso': casoDeUso,
  concepto,
  justificacion,
  recurso: (
    <>
      <VideoClip />
      {analisis}
      <HapticChart />
    </>
  ),
  fuentes,
}