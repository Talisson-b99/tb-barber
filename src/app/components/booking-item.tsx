'use client'
import { Prisma } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { toast } from 'sonner'

import { cancelBooking } from '../actions/cancel-booking'
import StarRating from './starRating'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { barber: true; service: true }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['cancelBooking', booking.id],
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      })
      toast.success('Reserva cancelada com sucesso', {
        id: 'cancel-booking',
      })
    },
    onError: () => {
      toast.error('Erro ao cancelar reserva', {
        id: 'cancel-booking',
      })
    },
  })

  function cancelBookingHandler() {
    toast.loading('Cancelando reserva...', {
      id: 'cancel-booking',
    })
    mutate(booking.id)
  }
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Card className="mt-3">
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
        </SheetTrigger>
        <SheetContent className="flex h-screen w-[80%] flex-col px-0">
          <SheetHeader>
            <SheetTitle className="border-b px-5 py-6 text-left text-lg font-bold">
              Infomarções da Reserva
            </SheetTitle>
          </SheetHeader>
          <div className="px-5">
            <div className="relative my-6 h-[180px] w-full">
              <Image src={'/map.png'} fill alt="mapa da barbearia" />
              <div className="absolute bottom-3 left-1/2 flex w-[90%] -translate-x-1/2 gap-3 rounded-md bg-[#1A1B1F] px-5 py-3">
                <div className="relative size-12">
                  <Image
                    src={booking.barber.imageUrl}
                    fill
                    alt={booking.barber.name}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="truncate font-bold">
                    {booking.barber.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {booking.barber.address}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative flex h-[100%] flex-1 flex-col">
              {booking.status === 'CONFIRMED' && (
                <Badge className="w-fit bg-[#221C3D] text-xs font-bold text-[#8162FF]">
                  Confirmado
                </Badge>
              )}
              {booking.status === 'COMPLETED' && (
                <Badge className="w-fit bg-[#26272B] text-xs font-bold text-[#838896]">
                  Finalizado
                </Badge>
              )}

              {booking.status === 'CANCELED' && (
                <Badge className="w-fit bg-red-500/20 text-xs font-bold text-red-500">
                  Cancelado
                </Badge>
              )}

              <Card className="mt-6">
                <CardContent className="flex flex-col gap-3 p-3">
                  <div className="flex justify-between font-bold">
                    <span>{booking.service.name}</span>
                    <span>
                      {Number(booking.service.price).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data</span>
                    <span>
                      {format(booking.date, 'dd MMMM', { locale: ptBR })}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Horário</span>
                    <span>{format(booking.date, 'HH:mm')}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Barbearia</span>
                    <span>{booking.barber.name}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-[100%] flex gap-3">
                <Button className="w-full" variant={'secondary'}>
                  <SheetClose>Voltar</SheetClose>
                </Button>

                {booking.status === 'CONFIRMED' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        Cancelar Reserva
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90%] rounded-lg">
                      <div className="flex flex-col text-center">
                        <h4 className="text-xl font-bold">Cancelar Reserva</h4>
                        <p className="text-sm text-muted-foreground">
                          Você está prestes a cancelar a reserva, tem certeza
                          que deseja continuar?
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <DialogClose asChild>
                          <Button className="w-full" variant={'secondary'}>
                            Cancelar
                          </Button>
                        </DialogClose>
                        <Button
                          onClick={cancelBookingHandler}
                          variant={'destructive'}
                          className="w-full"
                        >
                          Confimar
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {booking.status === 'COMPLETED' && (
                  <Dialog>
                    {booking.rating ? (
                      <DialogClose asChild>
                        <Button
                          className="w-full bg-green-600"
                          variant={'ghost'}
                        >
                          Avaliação realizada
                        </Button>
                      </DialogClose>
                    ) : (
                      <DialogTrigger asChild>
                        <Button variant="default" className="w-full">
                          Avaliar Barbearia
                        </Button>
                      </DialogTrigger>
                    )}

                    <DialogContent className="flex w-[80%] flex-col items-center rounded-lg">
                      <span className="font-bold">Avalie sua experiência</span>
                      <span className="text-center text-sm text-muted-foreground">
                        Toque nas estrelas para avaliar sua experiência na{' '}
                        {booking.barber.name}
                      </span>
                      <StarRating bookingId={booking.id} />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default BookingItem
