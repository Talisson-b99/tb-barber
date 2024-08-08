import { Calendar, HomeIcon, LogIn, LogOut, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { quickSearchOptions } from '../_constants/search'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const Menu = () => {
  const account = false
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-0">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
          <div className="flex items-center border-b py-6">
            {account ? (
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage
                    src={'https://github.com/talisson-b99.png'}
                    alt="avatar"
                  />
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-left font-bold">Talisson Barbosa</p>
                  <p className="text-xs">talissonbarbosa@gmail.com</p>
                </div>
              </div>
            ) : (
              <div className="flex w-full items-center justify-between">
                <h3 className="text-lg font-bold">Olá. Faça seu login!</h3>
                <Button size={'icon'}>
                  <LogIn size={16} />
                </Button>
              </div>
            )}
          </div>
        </SheetHeader>

        <div className="border-b py-6">
          <Button
            asChild
            className="flex w-full items-center justify-start gap-1"
          >
            <Link href={'/'}>
              <HomeIcon size={16} />
              <span>Início</span>
            </Link>
          </Button>

          <Button
            asChild
            className="flex w-full items-center justify-start gap-1 bg-transparent"
          >
            <Link href={'/'}>
              <Calendar size={16} />
              <span>Agendamentos</span>
            </Link>
          </Button>
        </div>

        <div className="flex-1 border-b pt-6">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              asChild
              className="flex h-11 w-full items-center justify-start gap-2 bg-transparent"
            >
              <Link href={'/'}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                <span className="text-sm">{option.title}</span>
              </Link>
            </Button>
          ))}
        </div>
        <SheetFooter className="py-4">
          <Button
            asChild
            className="w-full justify-start gap-2"
            variant={'ghost'}
          >
            <Link href={'/'}>
              <LogOut size={16} />
              Sair da conta
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Menu
