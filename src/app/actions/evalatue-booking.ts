'use server'

import { currentUser } from '@clerk/nextjs/server'

import { db } from '../lib/prisma'

export async function evaluateBooking(bookingId: string, rating: number) {
  const user = await currentUser()

  console.log('rating', rating)
  if (!user) {
    throw new Error('User not found')
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
