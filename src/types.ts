export interface Resource {
  title: string
  url: string
  description?: string
}

export interface Topic {
  id: string
  title: string
  description: string
  completed: boolean
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  prerequisites?: string[]
  resources?: Resource[]
}

export interface Category {
  id: string
  title: string
  icon: string
  topics: Topic[]
}

export type RoadmapData = Category[]
