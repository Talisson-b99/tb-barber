import { currentUser } from '@clerk/nextjs/server'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import ListBarberShop from '@/app/components/list-barbershop'
import { Button } from '@/app/components/ui/button'

import { quickSearchOptions } from './_constants/search'
// import BookingItem from './components/booking-item'
import Header from './components/header'
import SearchInput from './components/search-input'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const user = await currentUser()

  return (
    <div>
      <Header />
      <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-[1440px] lg:px-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-32">
          <div className="space-y-6">
            <h2 className="text-xl">
              Olá,{' '}
              <span className="font-bold">
                {user?.firstName || 'Seja bem vindo'}
              </span>
            </h2>
            <span className="text-sm">
              {format(new Date(), "eeee, dd 'de' MMMM", { locale: ptBR })}
            </span>

            <SearchInput />

            {/* <BookingItem /> */}
          </div>
          <div className="hidden lg:col-span-2 lg:flex lg:overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            <ListBarberShop />
          </div>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll lg:hidden [&::-webkit-scrollbar]:hidden">
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

        <div className="relative mt-6 h-36 w-full lg:hidden">
          <Image
            src={'/banner-01.png'}
            alt="agende nos melhores"
            fill
            className="h-full w-full rounded-lg object-cover"
          />
        </div>

        <div className="lg:hidden">{/* <BookingItem /> */}</div>

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
