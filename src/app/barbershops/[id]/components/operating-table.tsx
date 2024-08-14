interface OperatingTableProps {
  hours: string[]
}

const OperatingTable = ({ hours }: OperatingTableProps) => {
  const DAYSWEEK = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ]

  const opening = hours[0]
  const closing = hours[hours.length - 1]
  return (
    <div>
      {DAYSWEEK.map((day, i) => (
        <div key={i} className="flex justify-between space-y-2.5 text-sm">
          <span className="text-muted-foreground">{day}</span>
          <span>
            {day === 'Segunda' && 'Fechado'}
            {day === 'Domingo' && 'Fechado'}
            {day !== 'Domingo' &&
              day !== 'Segunda' &&
              `${opening} - ${closing}`}
          </span>
        </div>
      ))}
    </div>
  )
}

export default OperatingTable
