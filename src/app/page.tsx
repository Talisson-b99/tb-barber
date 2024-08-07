import { Search } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'

import Header from '@/app/components/header'
import ListBarberShop from '@/app/components/list-barbershop'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'

import { quickSearchOptions } from './_constants/search'
import BookingItem from './components/booking-item'
import Footer from './components/footer'

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
          <Input
            className="flex-1 border px-3 py-2 shadow-sm outline-none focus-within:ring-violet-100 focus-within:transition-colors focus-within:duration-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400 dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
            placeholder="Buscar..."
          />
          <Button size={'icon'}>
            <Search />
          </Button>
        </div>

        <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((item) => (
            <Button className="gap-2" variant={'secondary'} key={item.title}>
              <Image
                src={item.imageUrl}
                height={16}
                width={16}
                alt={item.title}
              />
              {item.title}
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
      <Footer />
    </div>
  )
}
