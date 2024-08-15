'use client'

import { Barbershop, BarbershopService, Booking } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Smartphone } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

import { cancelBooking } from '@/app/actions/cancel-booking'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'

import OperatingTable from './operating-table'

interface AsideInfoBarbershopProps {
  barber: Barbershop
  booking?: Booking
  service?: BarbershopService
}

const AsideInfoBarbershop = ({
  barber,
  booking,
  service,
}: AsideInfoBarbershopProps) => {
  const queryClient = useQueryClient()
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard
      .writeText(phone)
      .then(() => {
        toast.success('Telefone copiado com sucesso!')
      })
      .catch((err) => {
        console.error('Erro ao copiar o telefone: ', err)
        toast.error('Falha ao copiar o telefone.')
      })
  }

  const { mutate } = useMutation({
    mutationKey: ['cancelBooking', booking?.id],
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

  function handleCancelBooking() {
    if (!booking) return
    mutate(booking?.id)
  }

  return (
    <aside className="sticky top-0 rounded-[30px] bg-[#1A1B1F]">
      <div className="p-5">
        <div className="relative mx-auto h-[300px] w-[100%]">
          <Image
            src={'/map.png'}
            alt="mapa da barbearia"
            fill
            className="rounded-[20px] object-cover"
          />
          <div className="absolute bottom-3 left-1/2 flex w-[90%] -translate-x-1/2 gap-3 rounded-[10px] bg-[#1A1B1F] px-5 py-3">
            <div className="relative h-10 w-10">
              <Image
                src={barber.imageUrl}
                fill
                alt={barber.name}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="truncate font-bold">{barber.name}</span>
              <span className="trucate">{barber.address}</span>
            </div>
          </div>
        </div>

        <div className="py-5">
          <h3 className="mb-3 text-sm font-bold">Sobre nós</h3>
          <p className="text-justify text-sm text-muted-foreground">
            {barber.description}
          </p>
        </div>

        <div className="space-y-3 border-y py-5">
          {barber.phones.map((phone, i) => (
            <div className="flex items-center gap-2" key={i}>
              <Smartphone size={16} />
              <span>{phone}</span>
              <Button
                variant={'outline'}
                className="ml-auto"
                size={'sm'}
                onClick={() => handleCopyPhone(phone)}
              >
                Copiar
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t py-5">
          {booking && service ? (
            <Card>
              <CardContent className="space-y-3 p-3">
                <div className="flex justify-between">
                  <span className="font-bold">{service.name}</span>
                  <span className="text-sm font-bold">
                    {Number(service.price).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">data</span>
                  <span>
                    {format(booking.date, "eeee, dd 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Horário</span>
                  <span>{format(booking.date, 'HH:mm', { locale: ptBR })}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Barbearia</span>
                  <span>{barber.name}</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <OperatingTable hours={barber.hoursAvailable} />
          )}
        </div>

        {booking?.status === 'CONFIRMED' && (
          <div className="pt-5">
            <Button
              className="w-full"
              variant={'destructive'}
              onClick={handleCancelBooking}
            >
              Cancelar reserva
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default AsideInfoBarbershop
