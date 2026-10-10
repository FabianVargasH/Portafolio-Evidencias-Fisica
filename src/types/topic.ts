import type { ReactNode } from 'react'

export type ResourceType =
  | 'Visualización de datos'
  | 'Simulación interactiva'
  | 'Diagrama'
  | 'Multimedia con análisis'

export type TopicContent = Partial<Record<string, ReactNode>>

export interface TopicMeta {
  id: string
  num: number
  title: string
  resource: ResourceType
  content?: TopicContent
}