import { MenuIcon } from 'lucide-react'
import Image from 'next/image'

import { Button } from './ui/button'
import { Separator } from './ui/separator'

const Header = () => {
  return (
    <header>
      <div className="flex justify-between px-5 py-8">
        <Image
          src={'/logo.png'}
          width={130}
          height={18}
          alt="fsw barber"
          quality={100}
        />
        <Button variant={'outline'} size={'icon'}>
          <MenuIcon />
        </Button>
      </div>
      <Separator />
    </header>
  )
}

export default Header
