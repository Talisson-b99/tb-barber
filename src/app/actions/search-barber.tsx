'use server'

import { db } from '../lib/prisma'

export async function searchdBarber(search: string) {
  const barber = await db.barbershop.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          services: {
            some: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        },
      ],
    },
  })

  return barber
}
