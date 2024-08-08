'use client'
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { Calendar, HomeIcon, LogIn, LogOut, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { quickSearchOptions } from '../_constants/search'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const Menu = () => {
  const { user } = useUser()

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
            {user ? (
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src={user.imageUrl} alt="avatar" />
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-left font-bold">{user.fullName}</p>
                  <p className="text-xs">
                    {user?.emailAddresses[0].emailAddress}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex w-full items-center justify-between">
                <h3 className="text-lg font-bold">Olá. Faça seu login!</h3>
                <Dialog>
                  <DialogTrigger>
                    <Button size={'icon'}>
                      <LogIn size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex w-[90%] flex-col items-center rounded-lg">
                    <span className="font-bold">Faça login na plataforma</span>
                    <span className="text-sm text-muted-foreground">
                      Conecte-se usando sua conta do Google
                    </span>
                    <SignInButton>
                      <Button
                        className="flex w-full items-center gap-2 font-bold"
                        variant={'outline'}
                      >
                        <Image
                          src={'/google.svg'}
                          width={16}
                          height={16}
                          alt={'Google'}
                        />
                        Google
                      </Button>
                    </SignInButton>
                  </DialogContent>
                </Dialog>
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
          <SignOutButton>
            <Button className="w-full justify-start gap-2" variant={'ghost'}>
              <LogOut size={16} />
              Sair da conta
            </Button>
          </SignOutButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Menu
