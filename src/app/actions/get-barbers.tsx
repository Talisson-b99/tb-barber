'use server'

import { db } from '../lib/prisma'

export async function getBarbers() {
  const barbers = await db.barbershop.findMany({
    take: 5,
    include: { bookings: true },
  })

  return barbers
}
