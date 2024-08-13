'use server'

import { currentUser } from '@clerk/nextjs/server'

import { db } from '../lib/prisma'

export async function cancelBooking(bookingId: string) {
  const user = await currentUser()

  if (!user) {
    console.log('You must be signed in to cancel a booking')
    throw new Error('You must be signed in to cancel a booking')
  }

  const response = await db.booking.update({
    where: { id: bookingId },
    data: { status: 'CANCELED' },
  })
  console.log('reserva atualizada', response)
}
