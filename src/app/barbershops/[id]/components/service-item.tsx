'use client'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs'
import { Barbershop, BarbershopService } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { set } from 'date-fns'
import { LogIn } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { createBooking } from '@/app/actions/create-booking'
import { getHollidays } from '@/app/actions/get-hollidays'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/app/components/ui/dialog'
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
  const { user } = useUser()
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

  const { data } = useQuery({
    queryKey: ['holiday', barber.id],
    queryFn: () => getHollidays(),
    staleTime: 1000 * 60 * 60 * 24 * 7,
  })

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
                {user ? (
                  <>
                    <SheetHeader className="borderb py-6">
                      <SheetTitle className="text-left">
                        Fazer Reserva
                      </SheetTitle>
                    </SheetHeader>
                    <div>
                      <CalendarComponent
                        barberId={barber.id}
                        hoursSelected={hoursSelected}
                        handleChangeHourClick={handleChangeHourClick}
                        date={date}
                        setDate={setDate}
                        defaultHolidays={data}
                      />
                    </div>

                    <InfoBooking
                      barber={barber}
                      service={service}
                      hourSelected={hoursSelected}
                      date={date}
                    />

                    <div className="relative flex-1">
                      <Button
                        className="absolute bottom-6 w-full"
                        onClick={handleBooking}
                        disabled={!date || !hoursSelected || isPending}
                      >
                        Confirmar
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex h-screen justify-center">
                    <div className="mt-16 flex w-full justify-between">
                      <h3 className="text-lg font-bold">
                        Olá. Faça seu login!
                      </h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size={'icon'}>
                            <LogIn size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="flex w-[90%] flex-col items-center rounded-lg">
                          <span className="font-bold">
                            Faça login na plataforma
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Conecte-se usando sua conta do Google
                          </span>
                          <SignInButton>
                            <Button
                              className="flex w-full items-center gap-2 font-bold"
                              variant={'outline'}
                            >
                              <Image
                                src={'/google.svg'}
                                width={16}
                                height={16}
                                alt={'Google'}
                              />
                              Google
                            </Button>
                          </SignInButton>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
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
