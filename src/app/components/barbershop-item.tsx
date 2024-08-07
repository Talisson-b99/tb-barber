import { Barbershop } from '@prisma/client'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface BabershopItemProsp {
  barber: Barbershop
}

const BabershopItem = ({ barber }: BabershopItemProsp) => {
  return (
    <Card className="h-fit min-w-[167px] rounded-2xl">
      <CardContent className="p-0">
        <div className="relative h-[160px] w-full">
          <Badge className="absolute left-2 top-2 z-10 flex items-center gap-px bg-[#221C3D]/70 py-1 text-xs font-bold">
            <Star size={12} fill="text-primary" />
            5.0
          </Badge>
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
