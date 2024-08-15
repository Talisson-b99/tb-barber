/* eslint-disable react/no-children-prop */
'use client'
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { Calendar, LogOut, UserCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Menu from './menu'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

const Header = () => {
  const { user } = useUser()
  return (
    <header className="w-full border-b">
      <div className="flex items-center justify-between px-5 py-3 md:mx-auto md:w-full md:max-w-[1440px] md:px-3 md:py-6">
        <Link href={'/'}>
          <Image
            src={'/logo.png'}
            width={40}
            height={40}
            alt="barbershop"
            quality={100}
          />
        </Link>
        <div className="md:hidden">
          <Menu />
        </div>

        <div className="hidden md:flex">
          {user ? (
            <div className="flex items-center gap-6">
              <Button asChild variant={'ghost'}>
                <Link
                  href={'/bookings'}
                  className="flex items-center gap-2 text-sm font-bold"
                >
                  <Calendar size={16} />
                  Agendamentos
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
                <span className="text-sm font-bold">{user?.fullName}</span>
                <Button asChild variant={'ghost'} className="cursor-pointer">
                  <SignOutButton
                    children={
                      <div>
                        <LogOut size={16} />
                      </div>
                    }
                  />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Button asChild variant={'ghost'}>
                <Link
                  href={'/bookings'}
                  className="flex items-center gap-2 font-bold"
                >
                  <Calendar />
                  Agendamentos
                </Link>
              </Button>

              <Button
                asChild
                className="flex cursor-pointer items-center justify-center gap-2 font-bold"
              >
                <SignInButton
                  children={
                    <div>
                      <UserCircle />
                      <span>Perfil</span>
                    </div>
                  }
                />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
