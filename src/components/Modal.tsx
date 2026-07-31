import { useEffect, useRef } from 'react'
import { Topic } from '../types'

interface ModalProps {
  topic: Topic
  completed: boolean
  onClose: () => void
  onToggle: () => void
}

export function Modal({ topic, completed, onClose, onToggle }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const levelColors = {
    beginner: { bg: '#dcfce7', border: '#22c55e', text: '#166534' },
    intermediate: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
    advanced: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
  }

  const colors = levelColors[topic.level]

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef} style={{ borderColor: colors.border }}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="modal-title" style={{ color: colors.border }}>
            <span className="modal-level-badge" style={{ backgroundColor: colors.border }}>
              {topic.level === 'beginner' ? 'Начинающий' : topic.level === 'intermediate' ? 'Средний' : 'Продвинутый'}
            </span>
            <h2>{topic.title}</h2>
          </div>
          <button
            className={`modal-toggle-btn ${completed ? 'completed' : ''}`}
            style={{ backgroundColor: completed ? colors.border : 'transparent', borderColor: colors.border }}
            onClick={onToggle}
          >
            {completed ? '✓ Пройдено' : 'Отметить пройденным'}
          </button>
        </div>

        <p className="modal-description">{topic.description}</p>

        {topic.prerequisites && topic.prerequisites.length > 0 && (
          <div className="modal-section">
            <h3 className="modal-section-title">📌 Пререквизиты</h3>
            <div className="modal-prerequisites">
              {topic.prerequisites.map((prereq) => (
                <span key={prereq} className="modal-prerequisite-tag">
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}

        {topic.resources && topic.resources.length > 0 && (
          <div className="modal-section">
            <h3 className="modal-section-title">📚 Полезные материалы</h3>
            <div className="modal-resources">
              {topic.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-resource-card"
                  style={{ borderColor: colors.border }}
                >
                  <div className="modal-resource-icon">🔗</div>
                  <div className="modal-resource-info">
                    <h4 className="modal-resource-title">{resource.title}</h4>
                    {resource.description && (
                      <p className="modal-resource-desc">{resource.description}</p>
                    )}
                  </div>
                  <div className="modal-resource-arrow">→</div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
