import { Topic } from '../types'

interface TopicNodeProps {
  topic: Topic
  completed: boolean
  onToggle: () => void
  row: number
}

export function TopicNode({ topic, completed, onToggle }: TopicNodeProps) {
  const levelColors = {
    beginner: { bg: '#dcfce7', border: '#22c55e', text: '#166534' },
    intermediate: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
    advanced: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
  }

  const colors = levelColors[topic.level]

  return (
    <div
      className={`topic-node ${completed ? 'completed' : ''} ${topic.level}`}
      style={{
        borderColor: colors.border,
        backgroundColor: completed ? colors.border + '20' : colors.bg,
      }}
      onClick={onToggle}
    >
      <div
        className="topic-check"
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
        {topic.prerequisites && topic.prerequisites.length > 0 && (
          <div className="prerequisites">
            <span className="prerequisites-label">Пререквизиты:</span>
            <div className="prerequisites-list">
              {topic.prerequisites.map((prereq) => (
                <span key={prereq} className="prerequisite-tag">
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
