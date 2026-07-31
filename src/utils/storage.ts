import { RoadmapData } from '../types'

const STORAGE_KEY = 'csharp-roadmap-progress'

export function loadProgress(): Record<string, boolean> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Error loading progress:', error)
  }
  return {}
}

export function saveProgress(progress: Record<string, boolean>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

export function updateTopicProgress(topicId: string, completed: boolean): void {
  const progress = loadProgress()
  progress[topicId] = completed
  saveProgress(progress)
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function getCompletionPercentage(data: RoadmapData): number {
  const allTopics = data.flatMap((category) => category.topics)
  const progress = loadProgress()
  const completedCount = allTopics.filter((topic) => progress[topic.id]).length
  return allTopics.length > 0 ? Math.round((completedCount / allTopics.length) * 100) : 0
}
