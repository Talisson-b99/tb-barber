'use server'

import { currentUser } from '@clerk/nextjs/server'

import { db } from '../lib/prisma'

export async function getBookings() {
  const user = await currentUser()

  if (!user) {
    throw new Error('User not found')
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: user.id,
    },
    include: {
      barber: true,
      service: true,
    },
  })
  console.log('bookings', bookings)
  return bookings
}
