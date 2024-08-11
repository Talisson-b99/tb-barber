/* eslint-disable react/no-children-prop */
import { SignInButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Calendar, UserCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Menu from './menu'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

const Header = async () => {
  const user = await currentUser()
  return (
    <header className="border-b">
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
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <span className="font-bold">{user?.fullName}</span>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Button asChild variant={'ghost'}>
                <Link href={'#'} className="flex items-center gap-2 font-bold">
                  <Calendar />
                  Agendamentos
                </Link>
              </Button>

              <Button
                asChild
                className="flex items-center justify-center gap-2 font-bold"
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
