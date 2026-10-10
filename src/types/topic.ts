export type ResourceType =
  | 'Visualización de datos'
  | 'Simulación interactiva'
  | 'Diagrama'
  | 'Multimedia con análisis'

export interface TopicMeta {
  id: string
  num: number
  title: string
  resource: ResourceType
}