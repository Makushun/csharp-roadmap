export interface Topic {
  id: string
  title: string
  description: string
  completed: boolean
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  prerequisites?: string[]
}

export interface Category {
  id: string
  title: string
  icon: string
  topics: Topic[]
}

export type RoadmapData = Category[]
