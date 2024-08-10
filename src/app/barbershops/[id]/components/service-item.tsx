'use client'
import { useAuth } from '@clerk/nextjs'
import { Barbershop, BarbershopService } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { set } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { createBooking } from '@/app/actions/create-booking'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet'

import CalendarComponent from './calendar'
import DialogConfirmationReservation from './dialog-confirmation-reservation'
import InfoBooking from './info-booking'

interface ServiceItemProps {
  service: BarbershopService
  barber: Barbershop
}

const ServiceItem = ({ service, barber }: ServiceItemProps) => {
  const queryClient = useQueryClient()
  const { userId } = useAuth()
  const [hoursSelected, setHoursSelected] = useState<string | undefined>(
    '09:00',
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleChangeHourClick(hour: string) {
    setHoursSelected(hour)
  }

  function handleBookService() {
    const hourSelected = hoursSelected?.split(':')[0]
    const minutesSelected = hoursSelected?.split(':')[1]
    const dayAndHourSelected = set(date!, {
      hours: Number(hourSelected),
      minutes: Number(minutesSelected),
    })
    return dayAndHourSelected
  }

  const { isPending, mutate } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      setIsMenuOpen(false)
      setIsDialogOpen(true)
      toast.success('Reserva realizada com sucesso!', {
        id: 'booking',
      })
      queryClient.invalidateQueries({ queryKey: ['hoursAvailable', barber.id] })
    },

    onError: () => {
      toast.error('Erro ao realizar a reserva.', {
        id: 'booking',
      })
    },
  })

  const handleBooking = () => {
    toast.loading('Realizando reserva...', {
      id: 'booking',
    })
    mutate({
      date: handleBookService(),
      serviceId: service.id,
      barbershopId: barber.id,
      userId: userId!,
    })
  }

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

            <Sheet onOpenChange={setIsMenuOpen} open={isMenuOpen}>
              <SheetTrigger asChild>
                <Button variant={'secondary'} className="text-sm font-bold">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col p-0 px-5">
                <SheetHeader className="borderb py-6">
                  <SheetTitle className="text-left">Fazer Reserva</SheetTitle>
                </SheetHeader>
                <div>
                  <CalendarComponent
                    barberId={barber.id}
                    hoursSelected={hoursSelected}
                    handleChangeHourClick={handleChangeHourClick}
                    date={date}
                    setDate={setDate}
                  />
                </div>

                <InfoBooking
                  barber={barber}
                  service={service}
                  hourSelected={hoursSelected}
                />

                <div className="relative flex-1">
                  <Button
                    className="absolute bottom-6 w-full"
                    onClick={handleBooking}
                    disabled={!hoursSelected || isPending}
                  >
                    Confirmar
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
      <DialogConfirmationReservation
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </Card>
  )
}

export default ServiceItem
