import { Search } from 'lucide-react'
import Image from 'next/image'

import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-xl">
          Olá, <span className="font-bold">Talisson</span>
        </h2>
        <span className="text-sm">Sexta, 2 de Fevereiro</span>
        <div className="mt-6 flex items-center gap-2">
          <Input
            className="flex-1 border px-3 py-2 shadow-sm outline-none focus-within:ring-violet-100 focus-within:transition-colors focus-within:duration-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400 dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
            placeholder="Buscar..."
          />
          <Button size={'icon'}>
            <Search />
          </Button>
        </div>

        <div className="relative mt-6 h-36 w-full">
          <Image
            src={'/banner-01.png'}
            alt="agende nos melhores"
            fill
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  )
}
