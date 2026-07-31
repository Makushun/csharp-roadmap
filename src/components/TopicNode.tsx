import { Topic } from '../types'

interface TopicNodeProps {
  topic: Topic
  completed: boolean
  onToggle: () => void
  onClick: () => void
  row: number
}

export function TopicNode({ topic, completed, onToggle, onClick }: TopicNodeProps) {
  const levelColors = {
    beginner: { bg: '#dcfce7', border: '#22c55e', text: '#166534' },
    intermediate: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
    advanced: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
  }

  const colors = levelColors[topic.level]

  const handleCheckToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggle()
  }

  return (
    <div className="topic-wrapper-full">
      <div
        className={`topic-node ${completed ? 'completed' : ''} ${topic.level}`}
        style={{
          borderColor: colors.border,
          backgroundColor: completed ? colors.border + '20' : colors.bg,
        }}
        onClick={onClick}
      >
        <div className="topic-node-inner">
          <div
            className="topic-check"
            onClick={handleCheckToggle}
            style={{
              backgroundColor: completed ? colors.border : 'transparent',
              borderColor: colors.border,
            }}
          >
            {completed && <span className="checkmark">✓</span>}
          </div>
          <div className="topic-content">
            <h3
              className="topic-title"
              style={{ color: completed ? colors.border : colors.text }}
            >
              {topic.title}
            </h3>
            <p className="topic-description">{topic.description}</p>
            {topic.resources && topic.resources.length > 0 && (
              <div className="topic-resources-hint">
                📚 {topic.resources.length} {topic.resources.length === 1 ? 'материал' : topic.resources.length < 5 ? 'материала' : 'материалов'}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {topic.prerequisites && topic.prerequisites.length > 0 && (
        <div className="prerequisites-below">
          <span className="prerequisites-label-small">Пререквизиты:</span>
          <div className="prerequisites-list-small">
            {topic.prerequisites.map((prereq) => (
              <span key={prereq} className="prerequisite-tag-small">
                {prereq}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
