'use client'

import { useQuery } from '@tanstack/react-query'

import { getBookings } from '../actions/get-bookings'
import BookingItem from '../components/booking-item'
import Header from '../components/header'
import { Skeleton } from '../components/ui/skeleton'

const BookingsPage = () => {
  const { data } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => getBookings(),
  })

  if (!data)
    return (
      <div>
        <Header />
        <div className="my-6 px-5">
          <Skeleton className="h-[22px] w-[160px]" />
        </div>
        <div className="flex flex-col gap-3 px-5">
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
        </div>
      </div>
    )

  const bookingsFinish = data.filter(
    (booking) => booking.status === 'COMPLETED',
  )

  const bookingsConfirmed = data.filter(
    (booking) => booking.status === 'CONFIRMED',
  )

  const bookingsCanceled = data.filter(
    (booking) => booking.status === 'CANCELED',
  )

  return (
    <div>
      <Header />

      <div className="px-5 pt-6">
        <h2 className="mb-6 text-xl font-bold">Agendamentos</h2>
        {bookingsConfirmed.length > 0 && (
          <>
            <h3 className="mb-3 text-xs font-bold text-muted-foreground">
              Confimardos
            </h3>
            {bookingsConfirmed.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}

        {bookingsFinish.length > 0 && (
          <div>
            <h3 className="mb-3 mt-6 text-xs font-bold text-muted-foreground">
              Finalizados
            </h3>
            {bookingsFinish.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        )}

        {bookingsCanceled.length > 0 && (
          <div className="pb-12">
            <h3 className="mb-3 mt-6 text-xs font-bold text-muted-foreground">
              Cancelados
            </h3>
            {bookingsCanceled.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingsPage
