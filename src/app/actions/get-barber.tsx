'use server'

import { notFound } from 'next/navigation'

import { db } from '../lib/prisma'

export async function getBarber(id: string) {
  const barber = await db.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  })

  if (!barber) {
    notFound()
  }

  return barber
}
