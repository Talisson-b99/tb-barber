import { Search } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'

import Header from '@/app/components/header'
import ListBarberShop from '@/app/components/list-barbershop'
import { Avatar, AvatarImage } from '@/app/components/ui/avatar'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'

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

        <div className="relative h-36 w-full">
          <Image
            src={'/banner-01.png'}
            alt="agende nos melhores"
            fill
            className="h-full w-full rounded-lg object-cover"
          />
        </div>

        <h2 className="mt-6 text-sm font-bold text-muted-foreground">
          Agendamentos
        </h2>

        <Card className="mt-3">
          <CardContent className="flex justify-between p-0">
            <div className="flex-1 p-3">
              <Badge className="text-bold bg-[#221C3D] text-xs text-[#8162FF]">
                Confirmado
              </Badge>
              <h3 className="mb-2 mt-3 font-bold">Corte de Cabelo</h3>
              <div className="flex gap-2">
                <Avatar className="size-6">
                  <AvatarImage src="/avatar.png" />
                </Avatar>
                <span className="text-sm">Vintage Barber</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 px-5 text-center">
              <p className="text-xs">Fevereiro</p>
              <p className="text-xl">06</p>
              <p className="text-xs">09:45</p>
            </div>
          </CardContent>
        </Card>
        <h3 className="mt-6 text-sm font-bold text-muted-foreground">
          Recomentados
        </h3>
        <ListBarberShop />

        <h2 className="mt-6 text-sm font-bold text-muted-foreground">
          Populares
        </h2>
        <ListBarberShop />
      </div>
      <Footer />
    </div>
  )
}
