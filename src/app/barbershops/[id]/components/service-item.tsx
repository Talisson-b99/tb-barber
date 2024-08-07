import { BarbershopService } from '@prisma/client'
import Image from 'next/image'

import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="flex gap-3 p-3">
        <div className="relative size-28">
          <Image
            src={service.imageUrl}
            fill
            alt={service.name}
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex-1">
            <h3 className="text-sm font-bold">{service.name}</h3>
            <p className="text-xs text-muted-foreground">
              {service.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-primary">
              {Number(service.price).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <Button variant={'secondary'} className="text-sm font-bold">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
