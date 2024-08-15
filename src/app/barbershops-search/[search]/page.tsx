'use client'

import { useQuery } from '@tanstack/react-query'

import { SearchBarber, searchdBarber } from '@/app/actions/search-barber'
import BabershopItem from '@/app/components/barbershop-item'
import Header from '@/app/components/header'
import SearchInput from '@/app/components/search-input'
import { Skeleton } from '@/app/components/ui/skeleton'

interface BarbershopSearchPageProps {
  searchParams: {
    q: SearchBarber
  }
}

const BarbershopSearchPage = ({ searchParams }: BarbershopSearchPageProps) => {
  const { data } = useQuery({
    queryKey: ['searchBarber', searchParams.q],
    queryFn: () => searchdBarber(searchParams.q),
  })

  if (!data) {
    return (
      <>
        <div className="px-5">
          <Skeleton className="my-6 h-[40px] w-full rounded-xl" />

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <Skeleton className="mt-6 h-[255px] min-w-[167px] rounded-2xl" />
            <Skeleton className="mt-6 h-[255px] min-w-[167px] rounded-2xl" />
            <Skeleton className="mt-6 h-[255px] min-w-[167px] rounded-2xl" />
            <Skeleton className="mt-6 h-[255px] min-w-[167px] rounded-2xl" />
            <Skeleton className="mt-6 h-[255px] min-w-[167px] rounded-2xl" />
          </div>
        </div>

        <div></div>
      </>
    )
  }

  return (
    <div className="">
      <Header />
      <div className="relative mx-auto px-5 pb-6 lg:max-w-[1440px] lg:px-3">
        <div className="py-6 lg:absolute lg:-top-24 lg:left-24 lg:w-[50%]">
          <SearchInput />
        </div>
        <div className="lg:pt-10">
          <span className="mb-3 block text-xs font-bold uppercase text-muted-foreground lg:mb-5 lg:text-xl">
            RESULTADOS PARA &quot;{searchParams.q}&quot;
          </span>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
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
