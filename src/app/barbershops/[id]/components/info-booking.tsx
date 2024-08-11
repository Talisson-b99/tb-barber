import { Barbershop, BarbershopService } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Card, CardContent } from '@/app/components/ui/card'

interface InfoBookingProps {
  service: BarbershopService
  barber: Barbershop
  hourSelected: string | undefined
  date: Date | undefined
}

const InfoBooking = ({
  barber,
  service,
  hourSelected,
  date,
}: InfoBookingProps) => {
  const dateFormated = format(date! || new Date(), 'dd MMMM', { locale: ptBR })
  return (
    <Card className="mt-6">
      <CardContent className="flex flex-col gap-3 p-3">
        <div className="flex justify-between font-bold">
          <span>{service.name}</span>
          <span>
            {Number(service.price).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Data</span>
          <span>{dateFormated}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Horário</span>
          <span>{hourSelected}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Barbearia</span>
          <span>{barber.name}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default InfoBooking
