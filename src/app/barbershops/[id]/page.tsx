'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, MapPin, Smartphone, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

import { getBarber } from '@/app/actions/get-barber'
import Header from '@/app/components/header'
import Menu from '@/app/components/menu'
import { Button } from '@/app/components/ui/button'
import { Skeleton } from '@/app/components/ui/skeleton'

import AsideInfoBarbershop from './components/aside-info-barbershop'
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

  if (!data)
    return (
      <>
        <div className="lg:hidden">
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
              <Skeleton className="h-9 w-20 rounded-lg" />
            </div>

            <div className="flex items-center justify-between pb-6">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-9 w-20 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px]">
          <Header />
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div className="col-span-2 flex flex-col">
              <div>
                <Skeleton className="h-[485px] w-full" />

                <div className="mt-3 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-60" />
                </div>
              </div>

              <div className="mt-14 grid grid-cols-2 gap-3">
                <Skeleton className="h-[136px] w-full" />
                <Skeleton className="h-[136px] w-full" />
                <Skeleton className="h-[136px] w-full" />
                <Skeleton className="h-[136px] w-full" />
              </div>
            </div>

            <div>
              <Skeleton className="h-screen w-[440px]" />
            </div>
          </div>
        </div>
      </>
    )

  const reviews = data.bookings.filter((booking) => booking.rating !== null)

  const ratingTotal = data.bookings.reduce(
    (acc, booking) => (acc += booking.rating || 0),
    0,
  )

  const averageRating =
    reviews.length > 0 ? (ratingTotal / reviews.length).toFixed(1) : 0

  return (
    <div>
      <div className="hidden lg:flex">
        <Header />
      </div>
      <div className="flex flex-col lg:mx-auto lg:mt-10 lg:grid lg:w-full lg:max-w-[1440px] lg:grid-cols-3 lg:gap-x-8 lg:px-6 lg:py-6">
        <div className="col-span-2 flex flex-col">
          <div>
            <div className="relative h-64 w-full lg:h-[485px] lg:w-full">
              <Image
                src={data?.imageUrl}
                fill
                alt={data?.name}
                className="object-cover lg:rounded-xl"
              />
              <Link href={'/'} className="absolute left-4 top-4 lg:hidden">
                <Button variant={'outline'} size={'icon'}>
                  <ArrowLeft />
                </Button>
              </Link>
              <div className="absolute right-4 top-4 lg:hidden">
                <Menu />
              </div>
            </div>

            <div className="border-b px-5 pb-6 pt-3 lg:flex lg:justify-between lg:border-none lg:px-0">
              <div>
                <h2 className="mb-3 text-xl font-bold">{data.name}</h2>
                <p className="mb-2 flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-primary" />
                  {data.address}
                </p>
              </div>
              <p className="flex items-center gap-2 text-sm">
                <Star size={16} className="fill-primary text-primary" />
                {averageRating} ({reviews.length} avaliações)
              </p>
            </div>
          </div>

          <div className="border-b px-5 py-6 lg:hidden">
            <h3 className="text-xs font-bold text-muted-foreground">
              SOBRE NÓS
            </h3>
            <p className="mt-3 text-justify text-sm">{data.description}</p>
          </div>

          <div className="mt-6 border-b pb-6 lg:border-none">
            <h3 className="mb-3 px-5 text-xs font-bold text-muted-foreground lg:px-0">
              Serviços
            </h3>
            <div className="flex flex-col gap-3 px-5 lg:grid lg:grid-cols-2 lg:px-0">
              {data.services.map((service) => (
                <ServiceItem key={service.id} barber={data} service={service} />
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pb-6 pt-3 lg:hidden">
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

        <div className="hidden lg:block">
          <AsideInfoBarbershop barber={data} />
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
