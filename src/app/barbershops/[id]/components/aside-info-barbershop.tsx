'use client'

import { Barbershop } from '@prisma/client'
import { Smartphone } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

import { Button } from '@/app/components/ui/button'

import OperatingTable from './operating-table'

interface AsideInfoBarbershopProps {
  barber: Barbershop
}

const AsideInfoBarbershop = ({ barber }: AsideInfoBarbershopProps) => {
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

        <div className="border-y py-5">
          <OperatingTable hours={barber.hoursAvailable} />
        </div>
      </div>
    </aside>
  )
}

export default AsideInfoBarbershop
