'use client'

import { Prisma } from '@prisma/client'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface BabershopItemProsp {
  barber: Prisma.BarbershopGetPayload<{
    include: {
      bookings: true
    }
  }>
}

const BabershopItem = ({ barber }: BabershopItemProsp) => {
  const reviews = barber.bookings.filter((booking) => booking.rating !== null)

  const ratingTotal = barber.bookings.reduce(
    (acc, booking) => (acc += booking.rating || 0),
    0,
  )

  const averageRating = reviews.length > 0 ? ratingTotal / reviews.length : 0
  return (
    <Card className="h-fit w-full min-w-[167px] rounded-2xl md:min-w-[220px]">
      <CardContent className="p-0">
        <div className="relative h-[160px] w-full md:h-[200px]">
          {averageRating > 0 && (
            <Badge className="absolute left-2 top-2 z-10 flex items-center gap-px bg-[#221C3D]/70 py-1 text-xs font-bold">
              <Star size={12} fill="text-primary" />
              {averageRating.toFixed(1)}
            </Badge>
          )}
          <Image
            src={barber.imageUrl}
            fill
            className="rounded-2xl object-cover px-1 pb-2 pt-1"
            alt=""
          />
        </div>

        <div className="px-3 pb-3">
          <h3 className="truncate font-bold">{barber.name}</h3>
          <p className="text-xs text-muted-foreground">{barber.address}</p>
          <Link href={`/barbershops/${barber.id}`}>
            <Button variant="secondary" className="mt-3 w-full">
              Reservar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default BabershopItem
