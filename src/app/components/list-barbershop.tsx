'use client'

import { Prisma } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { getBarbers } from '../actions/get-barbers'
import BabershopItem from './barbershop-item'
import { Skeleton } from './ui/skeleton'
const ListBarberShop = () => {
  const { data } = useQuery<
    Prisma.BarbershopGetPayload<{
      include: {
        bookings: true
      }
    }>[]
  >({
    queryKey: ['babershop'],
    queryFn: () => getBarbers(),
  })
  if (!data)
    return (
      <>
        <div className="flex gap-4 overflow-x-scroll md:hidden [&::-webkit-scrollbar]:hidden">
          <Skeleton className="mt-6 h-[255px] w-full min-w-[167px] rounded-2xl" />
          <Skeleton className="mt-6 h-[255px] w-full min-w-[167px] rounded-2xl" />
          <Skeleton className="mt-6 h-[255px] w-full min-w-[167px] rounded-2xl" />
        </div>

        <div className="hidden grid-cols-4 gap-4 overflow-x-scroll md:grid [&::-webkit-scrollbar]:hidden">
          <Skeleton className="mt-6 h-[255px] w-full min-w-[167px] rounded-2xl" />
          <Skeleton className="mt-6 h-[255px] w-full min-w-[167px] rounded-2xl" />
          <Skeleton className="mt-6 h-[255px] w-full min-w-[167px] rounded-2xl" />
          <Skeleton className="mt-6 h-[255px] w-full min-w-[167px] rounded-2xl" />
        </div>
      </>
    )

  return (
    <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {data?.map((barber) => <BabershopItem key={barber.id} barber={barber} />)}
    </div>
  )
}

export default ListBarberShop
