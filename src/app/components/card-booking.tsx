'use client'

import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

interface CardBookingProps {
  booking: Prisma.BookingGetPayload<{
    include: { barber: true; service: true }
  }>
  onclick?: () => void
}

const CardBooking = ({ booking, onclick, ...props }: CardBookingProps) => {
  return (
    <Card className="mt-3" onClick={onclick} {...props}>
      <CardContent className="flex justify-between p-0">
        <div className="flex-1 p-3">
          {booking.status === 'CONFIRMED' && (
            <Badge className="bg-[#221C3D] text-xs font-bold text-[#8162FF]">
              Confirmado
            </Badge>
          )}
          {booking.status === 'COMPLETED' && (
            <Badge className="bg-[#26272B] text-xs font-bold text-[#838896]">
              Finalizado
            </Badge>
          )}

          {booking.status === 'CANCELED' && (
            <Badge className="bg-red-500/20 text-xs font-bold text-red-500">
              Cancelado
            </Badge>
          )}

          <h3 className="mb-2 mt-3 font-bold">{booking.service.name}</h3>
          <div className="flex gap-2">
            <Avatar className="size-6">
              <AvatarImage src="/avatar.png" />
            </Avatar>
            <span className="text-sm">{booking.barber.name}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l-2 px-5 text-center">
          <p className="text-xs">
            {format(booking.date, 'LLLL', { locale: ptBR })}
          </p>
          <p className="text-xl">
            {format(booking.date, 'd', { locale: ptBR })}
          </p>
          <p className="text-xs">
            {format(booking.date, 'H:mm', { locale: ptBR })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardBooking
