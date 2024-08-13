'use server'
import { endOfDay, format, isFuture, startOfDay } from 'date-fns'

import { db } from '../lib/prisma'

interface GetHoursAvailable {
  barbershopId: string
  date?: Date
}

export async function getHoursAvailable({
  barbershopId,
  date = new Date(),
}: GetHoursAvailable) {
  const barbershop = await db.barbershop.findUnique({
    where: { id: barbershopId },
    select: { hoursAvailable: true },
  })

  if (!barbershop) {
    throw new Error('Barbershop not found')
  }

  const bookings = await db.booking.findMany({
    where: {
      barbershopId,
      date: {
        gte: startOfDay(new Date(date)), // Início do dia
        lt: endOfDay(new Date(date)), // Fim do dia
      },
    },
    select: {
      date: true,
    },
  })

  const bookedHours = bookings.map((booking) =>
    format(new Date(booking.date), 'HH:mm'),
  )

  const hoursAvailable = barbershop.hoursAvailable.filter(
    (hour) => !bookedHours.includes(hour),
  )

  const hoursAvailableFuturre = hoursAvailable
    .map((hour) => {
      const dateHour = new Date(`${format(date, 'yyyy-MM-dd')} ${hour}`)
      if (isFuture(dateHour)) {
        return format(dateHour, 'HH:mm')
      }
      return null
    })
    .filter((hour) => hour !== null)

  return hoursAvailableFuturre
}
