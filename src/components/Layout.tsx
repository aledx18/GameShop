import type { ReactNode } from 'react'
import NavBar from './NavBar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-20'>
      <NavBar />
      <main>{children}</main>
    </div>
  )
}
