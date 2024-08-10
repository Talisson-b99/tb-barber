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
  console.log(searchParams.q)

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
    <>
      <Header />
      <div className="px-5 pb-6">
        <div className="py-6">
          <SearchInput />
        </div>
        <div>
          <span className="mb-3 block text-xs font-bold uppercase text-muted-foreground">
            RESULTADOS PARA &quot;{searchParams.q}&quot;
          </span>

          <div className="grid grid-cols-2 gap-4">
            {data?.map((barber) => (
              <BabershopItem key={barber.id} barber={barber} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BarbershopSearchPage
