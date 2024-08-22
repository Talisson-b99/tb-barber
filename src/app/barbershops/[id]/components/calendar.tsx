'use client'

import { useQuery } from '@tanstack/react-query'

import { getHoursAvailable } from '@/app/actions/get-hours-available'
import { Button } from '@/app/components/ui/button'
import { Calendar } from '@/app/components/ui/calendar'
import { Skeleton } from '@/app/components/ui/skeleton'

type DateCalendar = Date | undefined

interface CalendarComponentProps {
  barberId: string
  hoursSelected: string | undefined
  handleChangeHourClick: (hour: string) => void
  date: Date | undefined
  setDate: (date: DateCalendar) => void
  defaultHolidays?: Date[]
}

const CalendarComponent = ({
  barberId,
  hoursSelected,
  handleChangeHourClick,
  date,
  setDate,
  defaultHolidays,
}: CalendarComponentProps) => {
  const { data } = useQuery({
    queryKey: ['hoursAvailable', barberId, date],
    queryFn: () => getHoursAvailable({ barbershopId: barberId, date: date! }),
  })

  const holidayDates = defaultHolidays
    ? defaultHolidays.map((holiday) => new Date(holiday))
    : []

  const disabledDays = [...holidayDates, { dayOfWeek: [0, 1] }]

  if (!data)
    return (
      <>
        <div>
          <Skeleton className="h-[281px] w-full" />
        </div>

        <div className="my-12 flex w-full gap-2">
          <Skeleton className="h-10 w-16 rounded-full" />
          <Skeleton className="h-10 w-16 rounded-full" />
          <Skeleton className="h-10 w-16 rounded-full" />
        </div>
      </>
    )

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        className="flex justify-between"
        onSelect={setDate}
        fromDate={new Date()}
        disabled={disabledDays}
      />

      <div className="mt-6 flex gap-2 overflow-x-scroll border-y py-6 [&::-webkit-scrollbar]:hidden">
        {data.map((hour) => (
          <Button
            key={hour}
            className={`${hoursSelected === hour ? 'bg-primary' : 'bg-secondary'} rounded-full`}
            onClick={() => handleChangeHourClick(hour)}
          >
            {hour}
          </Button>
        ))}
      </div>
    </>
  )
}

export default CalendarComponent
