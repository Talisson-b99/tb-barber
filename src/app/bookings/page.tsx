'use client'

import { Barbershop } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getBookings } from '../actions/get-bookings'
import AsideInfoBarbershop from '../barbershops/[id]/components/aside-info-barbershop'
import BookingItem from '../components/booking-item'
import CardBooking from '../components/card-booking'
import Header from '../components/header'
import { Skeleton } from '../components/ui/skeleton'

const BookingsPage = () => {
  const { data } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => getBookings(),
  })
  const [barber, setBarber] = useState<Barbershop>()

  function handleChangeBarber(barber: Barbershop) {
    setBarber(barber)
  }

  if (!data)
    return (
      <div>
        <Header />
        <div className="my-6 px-5 md:hidden">
          <Skeleton className="h-[22px] w-[160px]" />
        </div>
        <div className="flex flex-col gap-3 px-5 md:hidden">
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
        </div>

        <div className="mt-8 hidden grid-cols-2 md:grid">
          <div className="my-6 px-5">
            <Skeleton className="mb-8 h-[22px] w-[160px]" />
            <div className="space-y-3">
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
            </div>
          </div>
          <div>
            <Skeleton className="h-[700px] w-full rounded-[30px]" />
          </div>
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

      <div className="gap-x-8 px-5 pt-6 md:grid md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-xl font-bold">Agendamentos</h2>
          {bookingsConfirmed.length > 0 && (
            <>
              <h3 className="mb-3 text-xs font-bold text-muted-foreground">
                Confimardos
              </h3>
              {bookingsConfirmed.map((booking) => (
                <>
                  <div className="md:hidden">
                    <BookingItem booking={booking} />
                  </div>

                  <div className="hidden md:block">
                    <CardBooking
                      booking={booking}
                      onclick={() => handleChangeBarber(booking.barber)}
                    />
                  </div>
                </>
              ))}
            </>
          )}

          {bookingsFinish.length > 0 && (
            <div>
              <h3 className="mb-3 mt-6 text-xs font-bold text-muted-foreground">
                Finalizados
              </h3>
              {bookingsFinish.map((booking) => (
                <>
                  <div className="md:hidden">
                    <BookingItem booking={booking} />
                  </div>

                  <div className="hidden md:block">
                    <CardBooking
                      booking={booking}
                      onclick={() => handleChangeBarber(booking.barber)}
                    />
                  </div>
                </>
              ))}
            </div>
          )}

          {bookingsCanceled.length > 0 && (
            <div className="pb-12">
              <h3 className="mb-3 mt-6 text-xs font-bold text-muted-foreground">
                Cancelados
              </h3>
              {bookingsCanceled.map((booking) => (
                <>
                  <div className="md:hidden">
                    <BookingItem booking={booking} />
                  </div>

                  <div className="hidden md:block">
                    <CardBooking
                      booking={booking}
                      onclick={() => handleChangeBarber(booking.barber)}
                    />
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
        {barber && (
          <div className="hidden md:block md:max-w-[90%]">
            <AsideInfoBarbershop barber={barber} />
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingsPage
