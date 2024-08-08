import Image from 'next/image'

import Menu from './menu'
import { Separator } from './ui/separator'

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between px-5 py-3">
        <Image
          src={'/logo.png'}
          width={40}
          height={40}
          alt="barbershop"
          quality={100}
        />

        <Menu />
      </div>
      <Separator />
    </header>
  )
}

export default Header
