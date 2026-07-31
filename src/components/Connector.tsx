interface ConnectorProps {
  direction: 'vertical' | 'horizontal'
  fromBottom?: string
  toTop?: string
}

export function Connector({ direction }: ConnectorProps) {
  return (
    <div
      className={`connector ${direction}`}
      style={{
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
      }}
    >
      <div
        className="connector-line"
        style={{
          width: direction === 'horizontal' ? '60px' : '2px',
          height: direction === 'vertical' ? '30px' : '2px',
        }}
      />
    </div>
  )
}
