import { IconGame, IconOut, IconUser } from './icons/icons'
import Link from 'next/link'
import Toggler from './TogglerMode'

export default function NavBar() {
  return (
    <div
      className='fixed top-0 left-0 right-0 z-10 mt-1 rounded-xl bg-white/50 p-5 shadow-md backdrop-blur-md backdrop-filter dark:bg-blackFondo/50
           dark:shadow-md  dark:shadow-grisTwo lg:mx-20 lg:mt-2'
    >
      <nav className='flex items-center justify-between' aria-label='Global'>
        <div className='flex gap-10 lg:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Your Company</span>
            <IconGame />
          </Link>
          <Link href='/games'>Shop</Link>
        </div>

        <div className='flex items-center gap-6 lg:text-right'>
          <Toggler />
          <Link href='/login'>
            <IconUser />
          </Link>
          <IconOut />
        </div>
      </nav>
    </div>
  )
}
