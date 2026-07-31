import { useState, useEffect } from 'react'
import { roadmapData } from './data/roadmapData'
import { TopicNode } from './components/TopicNode'
import { Modal } from './components/Modal'
import { Connector } from './components/Connector'
import { loadProgress } from './utils/storage'
import './App.css'
import type { Topic } from './types'

function App() {
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  const toggleTopic = (topicId: string) => {
    const newProgress = { ...progress, [topicId]: !progress[topicId] }
    setProgress(newProgress)
    const event = new CustomEvent('topicToggle', { detail: { topicId, completed: !progress[topicId] } })
    window.dispatchEvent(event)
  }

  const openTopic = (topic: Topic) => {
    setSelectedTopic(topic)
  }

  const closeTopic = () => {
    setSelectedTopic(null)
  }

  const totalTopics = roadmapData.reduce((sum, cat) => sum + cat.topics.length, 0)
  const completedCount = Object.values(progress).filter(Boolean).length
  const completionPercentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom((prev) => Math.min(2, Math.max(0.5, prev + delta)))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="title">
            <span className="csharp-logo">C#</span> Roadmap
          </h1>
          <div className="progress-section">
            <div className="progress-bar-row">
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="progress-text">{completionPercentage}%</span>
            </div>
            <span className="progress-label">Прогресс обучения</span>
          </div>
        </div>
        <div className="controls">
          <button
            className="control-btn"
            onClick={() => setZoom((prev) => Math.min(2, prev + 0.1))}
            title="Увеличить"
          >
            🔍+
          </button>
          <button
            className="control-btn"
            onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}
            title="Уменьшить"
          >
            🔍-
          </button>
          <button
            className="control-btn"
            onClick={resetView}
            title="Сбросить вид"
          >
            🎯
          </button>
        </div>
      </header>

      <div
        className="canvas-container"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="canvas"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {roadmapData.map((category, categoryIndex) => (
            <div
              key={category.id}
              className="category-column"
              style={{ left: `${categoryIndex * 320}px` }}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h2 className="category-title">{category.title}</h2>
              </div>
              {category.topics.map((topic, topicIndex) => (
                <div key={topic.id} className="topic-wrapper">
                  <TopicNode
                    topic={topic}
                    completed={!!progress[topic.id]}
                    onToggle={() => toggleTopic(topic.id)}
                    onClick={() => openTopic(topic)}
                    row={topicIndex}
                  />
                  {topicIndex < category.topics.length - 1 && (
                    <Connector direction="vertical" />
                  )}
                </div>
              ))}
              {categoryIndex < roadmapData.length - 1 && (
                <Connector
                  direction="horizontal"
                  fromBottom={
                    category.topics[category.topics.length - 1]?.id
                  }
                  toTop={
                    roadmapData[categoryIndex + 1].topics[0]?.id
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color beginner" />
          <span>Начинающий</span>
        </div>
        <div className="legend-item">
          <div className="legend-color intermediate" />
          <span>Средний</span>
        </div>
        <div className="legend-item">
          <div className="legend-color advanced" />
          <span>Продвинутый</span>
        </div>
      </div>

      {selectedTopic && (
        <Modal
          topic={selectedTopic}
          completed={!!progress[selectedTopic.id]}
          onClose={closeTopic}
          onToggle={() => toggleTopic(selectedTopic.id)}
        />
      )}
    </div>
  )
}

export default App
