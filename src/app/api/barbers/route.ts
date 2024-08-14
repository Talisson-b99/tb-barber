import { db } from '@/app/lib/prisma'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: Request) {
  const barbershops = await db.barbershop.findMany({
    take: 6,
    include: { bookings: true },
  })

  return Response.json(barbershops)
}
