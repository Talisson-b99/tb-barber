'use server'

import { currentUser } from '@clerk/nextjs/server'

import { db } from '../lib/prisma'

export async function evaluateBooking(bookingId: string, rating: number) {
  const user = await currentUser()

  if (!user) {
    throw new Error('User not found')
  }

  const booking = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
  })

  if (!booking) {
    throw new Error('Booking not found')
  }

  if (booking.rating !== null) {
    throw new Error('Booking already evaluated')
  }

  await db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      rating,
    },
  })
}
