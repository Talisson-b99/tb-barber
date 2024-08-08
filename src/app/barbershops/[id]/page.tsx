'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, MapPin, Smartphone, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

import { getBarber } from '@/app/actions/get-barber'
import Menu from '@/app/components/menu'
import { Button } from '@/app/components/ui/button'
import { Skeleton } from '@/app/components/ui/skeleton'

import ServiceItem from './components/service-item'

interface BarbershopPage {
  params: {
    id: string
  }
}

const BarbershopPage = ({ params }: BarbershopPage) => {
  const { data } = useQuery({
    queryKey: ['barber', params.id],
    queryFn: () => getBarber(params.id),
  })

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success('Telefone copiado com sucesso!')
  }

  if (!data)
    return (
      <>
        <div className="relative">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="absolute left-4 top-4 size-10" />
          <Skeleton className="absolute right-4 top-4 size-10" />
        </div>

        <div className="space-y-3 px-5 py-3">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="mt-12 space-y-3 px-5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-20 w-full" />
        </div>

        <div className="mt-12 space-y-3 px-5">
          <Skeleton className="h-4 w-32" />

          <Skeleton className="h-[136px] w-full" />
          <Skeleton className="h-[136px] w-full" />
          <Skeleton className="h-[136px] w-full" />
          <Skeleton className="h-[136px] w-full" />
          <Skeleton className="h-[136px] w-full" />
          <Skeleton className="h-[136px] w-full" />
        </div>

        <div className="mt-12 space-y-3 px-5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>

          <div className="flex items-center justify-between pb-6">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>
      </>
    )

  return (
    <div>
      <div className="relative h-64 w-full">
        <Image src={data?.imageUrl} fill alt={data?.name} />
        <Link href={'/'} className="absolute left-4 top-4">
          <Button variant={'outline'} size={'icon'}>
            <ArrowLeft />
          </Button>
        </Link>
        <div className="absolute right-4 top-4">
          <Menu />
        </div>
      </div>

      <div className="border-b px-5 pb-6 pt-3">
        <h2 className="mb-3 text-xl font-bold">{data.name}</h2>
        <p className="mb-2 flex items-center gap-2 text-sm">
          <MapPin size={16} className="text-primary" />
          {data.address}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <Star size={16} className="fill-primary text-primary" />
          5.0 (889 avaliações)
        </p>
      </div>

      <div className="border-b px-5 py-6">
        <h3 className="text-xs font-bold text-muted-foreground">SOBRE NÓS</h3>
        <p className="mt-3 text-justify text-sm">{data.description}</p>
      </div>

      <div className="mt-6 border-b pb-6">
        <h3 className="mb-3 px-5 text-xs font-bold text-muted-foreground">
          Serviços
        </h3>
        <div className="flex flex-col gap-3 px-5">
          {data.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      <div className="px-5 pb-6 pt-3">
        <h3 className="mb-3 text-xs font-bold text-muted-foreground">
          Contados
        </h3>

        <div className="space-y-3">
          {data.phones.map((phone, i) => (
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
      </div>
    </div>
  )
}

export default BarbershopPage
