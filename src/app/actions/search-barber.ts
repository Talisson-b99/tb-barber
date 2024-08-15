'use server'

import { db } from '../lib/prisma'

export type SearchBarber =
  | 'Cabelo'
  | 'Barba'
  | 'Acabamento'
  | 'Sobrancelha'
  | 'Massagem'

export async function searchdBarber(search: SearchBarber) {
  const searchParam = search === 'Acabamento' ? 'pézinho' : search

  const barber = await db.barbershop.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchParam,
            mode: 'insensitive',
          },
        },
        {
          services: {
            some: {
              name: {
                contains: searchParam,
                mode: 'insensitive',
              },
            },
          },
        },
      ],
    },
    include: {
      bookings: true,
    },
  })

  return barber
}
