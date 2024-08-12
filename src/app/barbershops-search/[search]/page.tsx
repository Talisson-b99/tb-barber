'use client'

import { useQuery } from '@tanstack/react-query'

import { searchdBarber } from '@/app/actions/search-barber'
import BabershopItem from '@/app/components/barbershop-item'
import Header from '@/app/components/header'
import SearchInput from '@/app/components/search-input'
import { Skeleton } from '@/app/components/ui/skeleton'

interface BarbershopSearchPageProps {
  searchParams: {
    q: string
  }
}

const BarbershopSearchPage = ({ searchParams }: BarbershopSearchPageProps) => {
  const { data } = useQuery({
    queryKey: ['searchBarber', searchParams.q],
    queryFn: () => searchdBarber(searchParams.q),
  })

  if (!data) {
    return (
      <div className="px-5">
        <Skeleton className="my-6 h-[40px] w-full rounded-xl" />

        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="mt-6 h-[255px] min-w-[167px] rounded-2xl" />
          <Skeleton className="mt-6 h-[255px] min-w-[167px] rounded-2xl" />
          <Skeleton className="mt-6 h-[255px] min-w-[167px] rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="">
      <Header />
      <div className="relative mx-auto px-5 pb-6 md:max-w-[1440px] md:px-3">
        <div className="w-[50%] py-6 md:absolute md:-top-24 md:left-24">
          <SearchInput />
        </div>
        <div className="md:pt-10">
          <span className="mb-3 block text-xs font-bold uppercase text-muted-foreground md:mb-5 md:text-xl">
            RESULTADOS PARA &quot;{searchParams.q}&quot;
          </span>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {data?.map((barber) => (
              <BabershopItem key={barber.id} barber={barber} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarbershopSearchPage
