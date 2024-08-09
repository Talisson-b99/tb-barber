import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import ListBarberShop from '@/app/components/list-barbershop'
import { Button } from '@/app/components/ui/button'

import { quickSearchOptions } from './_constants/search'
import BookingItem from './components/booking-item'
import Header from './components/header'
import SearchInput from './components/search-input'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-xl">
          Olá, <span className="font-bold">Talisson</span>
        </h2>
        <span className="text-sm">Sexta, 2 de Fevereiro</span>
        <div className="my-6 flex items-center gap-2">
          <SearchInput />
        </div>

        <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((item) => (
            <Button
              className="gap-2"
              variant={'secondary'}
              key={item.title}
              asChild
            >
              <Link
                href={`/barbershops-search/search?q=${item.title}`}
                className="flex gap-2"
              >
                <Image
                  src={item.imageUrl}
                  height={16}
                  width={16}
                  alt={item.title}
                />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-36 w-full">
          <Image
            src={'/banner-01.png'}
            alt="agende nos melhores"
            fill
            className="h-full w-full rounded-lg object-cover"
          />
        </div>

        <BookingItem />

        <h3 className="mb-3 mt-6 text-sm font-bold text-muted-foreground">
          Recomentados
        </h3>
        <ListBarberShop />

        <h2 className="mb-3 mt-6 text-sm font-bold text-muted-foreground">
          Populares
        </h2>
        <ListBarberShop />
      </div>
    </div>
  )
}
