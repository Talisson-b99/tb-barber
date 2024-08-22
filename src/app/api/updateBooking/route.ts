import { NextResponse } from 'next/server'

import { db } from '@/app/lib/prisma'

export async function GET() {
  try {
    const now = new Date()

    await db.booking.updateMany({
      where: {
        date: {
          lt: now,
        },
        status: 'CONFIRMED',
      },
      data: {
        status: 'COMPLETED',
      },
    })
    console.log('Bookings updated')
    return NextResponse.json({ message: 'Bookings updated' })
  } catch (error) {
    return NextResponse.json({ message: 'Error updating bookings' })
  }
}
