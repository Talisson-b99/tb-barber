'use server'
import { auth } from '@clerk/nextjs/server'
import { format } from 'date-fns'
import { redirect } from 'next/navigation'

import { db } from '../lib/prisma'

interface CreateBooking {
  date: Date
  serviceId: string
  barbershopId: string
  userId: string
}

export async function createBooking(data: CreateBooking) {
  const { userId } = auth()

  if (userId !== data.userId) {
    return redirect('/')
  }

  if (userId === null) {
    return redirect('/')
  }
  await db.booking.create({
    data: {
      ...data,
      userId,
    },
  })
  const date = format(data.date, 'H:mm')
  return date
}
