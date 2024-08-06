'use client'

import { Barbershop } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import BabershopItem from './barbershop-item'
import { Skeleton } from './ui/skeleton'

const ListBarberShop = () => {
  const { data, isLoading } = useQuery<Barbershop[]>({
    queryKey: ['babershop'],
    queryFn: () => fetch('/api/barbers').then((res) => res.json()),
  })
  if (isLoading)
    return (
      <div className="flex gap-4 overflow-x-scroll">
        <Skeleton className="mt-6 h-[270px] min-w-[167px] rounded-2xl" />
        <Skeleton className="mt-6 h-[270px] min-w-[167px] rounded-2xl" />
        <Skeleton className="mt-6 h-[270px] min-w-[167px] rounded-2xl" />
      </div>
    )

  return (
    <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {data?.map((barber) => <BabershopItem key={barber.id} barber={barber} />)}
    </div>
  )
}

export default ListBarberShop
