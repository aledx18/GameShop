/* eslint-disable multiline-ternary */
import Breadcrumb from '@/components/Breadcrumb'
import useGetAllGames from '@/components/getAllgames'
import {
  IconAndroid,
  IconGrid,
  IconNintendo,
  IconPlaySta,
  IconRow,
  IconWindow,
  IconXbox
} from '@/components/icons/icons'
import { Game } from '@/components/interfaces'
import Skeleton from '@/components/loading/Skeleton'
import Pagination from '@/components/Pagination'
import Search from '@/components/Search'
import useStore from '@/components/store/zustand'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

interface PlatformIconProps {
  w: string
  h: string
}
export default function Games() {
  const { isLoading } = useGetAllGames()
  const [pagina, setPagina] = useState(1)
  const [view, setView] = useState(false)
  const { games } = useStore()

  const porPagina = 15
  const maximo = games.length / porPagina

  type PlatformIconComponent = FC<PlatformIconProps>
  const platformIcons: Record<string, PlatformIconComponent> = {
    Xbox: IconXbox,
    PlayStation: IconPlaySta,
    PC: IconWindow,
    Android: IconAndroid,
    Nintendo: IconNintendo
  }

  const platf = [
    { id: 0, name: <IconWindow w='55' h='35' /> },
    { id: 1, name: <IconNintendo w='55' h='35' /> },
    { id: 2, name: <IconPlaySta w='55' h='35' /> },
    { id: 3, name: <IconXbox w='55' h='35' /> },
    { id: 4, name: <IconAndroid w='55' h='35' /> }
  ]

  return (
    <>
      <Head>
        <title>StoreGame</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <section className='body-font mt-52 text-gray-400'>
          <div className='px-1 sm:px-6 lg:px-0'>
            {/* <!-- Breadcrumb --> */}
            <Breadcrumb />
            <div className='my-4 flex items-baseline justify-between border-b border-gray-200 pt-2 dark:border-gray-800'>
              {/* <!-- cantidad de juegos --> */}
              <div className='py-2'>
                <p className='text-md font-semibold text-black dark:text-white'>
                  {isLoading || games.length === 0 ? '∞ ' : games?.length} Games
                  🎮
                </p>
              </div>
              {/* <!-- botones view --> */}
              <div className='flex items-center'>
                <button
                  type='button'
                  onClick={() => setView(true)}
                  className=' text-gray-400 hover:text-gray-500'
                >
                  <IconGrid />
                </button>
                <button
                  type='button'
                  onClick={() => setView(false)}
                  className='ml-4 text-gray-400 hover:text-gray-500'
                >
                  <IconRow />
                </button>
                <button
                  type='button'
                  className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
                >
                  <span className='sr-only'>Filters</span>
                </button>
              </div>
            </div>

            <section className='pt-2 pb-24'>
              <h2 id='products-heading' className='sr-only'>
                Products
              </h2>

              <div className='grid grid-cols-1 gap-x-2 gap-y-10 lg:grid-cols-6'>
                {/* Filters izquierdos */}
                <div className='hidden rounded-md bg-blackOne lg:block'>
                  <div className='mx-2 my-2 rounded-md bg-grisTwo'>
                    <h3 className='py-64' />
                  </div>
                </div>

                {/* grid */}
                <div className='lg:col-span-5'>
                  {/* otros filtros */}
                  <div className=' flex justify-between rounded-md bg-blackOne py-4 dark:bg-blackOne'>
                    <div className='m-0 flex items-center justify-center gap-2 pl-4'>
                      {platf.map((plat) => (
                        <button
                          key={plat.id}
                          className='flex items-center justify-center rounded-md bg-grisTwo p-2'
                        >
                          {plat.name}
                        </button>
                      ))}
                    </div>
                    <Search />
                  </div>
                  {/* Games grid */}

                  <div className='container mx-auto mt-2'>
                    {isLoading && !view ? (
                      <Skeleton />
                    ) : (
                      <div className='flex flex-wrap'>
                        {games
                          ?.slice(
                            (pagina - 1) * porPagina,
                            (pagina - 1) * porPagina + porPagina
                          )
                          .map((game: Game) =>
                            view ? (
                              <div
                                key={game.id}
                                className='w-full p-1 md:w-1/3 lg:w-1/3'
                              >
                                <div
                                  style={{
                                    backgroundImage: `url(${game.background_image})`
                                  }}
                                  className='flex h-[300px] w-full items-end overflow-hidden rounded-lg bg-cover bg-center object-cover object-center shadow-xl'
                                >
                                  <div className='w-full overflow-hidden rounded-b-lg bg-grisTwo/60 backdrop-blur-md '>
                                    <Link href={`/games/${game.id}`}>
                                      <div className='flex items-center gap-3'>
                                        <h2 className='text-md p-2 font-medium text-white '>
                                          {game.name}
                                        </h2>
                                        <div className='flex gap-1'>
                                          {game.parent_platforms.map((pl) => {
                                            const PlatformIcon =
                                              platformIcons[pl.name]

                                            if (PlatformIcon) {
                                              return (
                                                <div key={pl.id}>
                                                  <PlatformIcon w='20' h='20' />
                                                </div>
                                              )
                                            } else {
                                              return null
                                            }
                                          })}
                                        </div>
                                      </div>
                                    </Link>
                                    <div className='flex gap-1 p-2'>
                                      {game.genres.map((pl) => (
                                        <h2
                                          className='text-grisClaro'
                                          key={pl.id}
                                        >
                                          {pl.name}
                                        </h2>
                                      ))}
                                      <h3 className='font-medium text-white'>
                                        $ {game.price}
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                key={game.id}
                                className='my-2 w-full rounded-md bg-grisOne lg:w-full'
                              >
                                <div className='flex items-center justify-between'>
                                  <div className='flex h-20 items-center rounded-md'>
                                    <Image
                                      className='h-20 w-auto rounded-l-md'
                                      src={game.background_image}
                                      width={100}
                                      height={100}
                                      alt={game.slug}
                                      quality={40}
                                      loading='lazy'
                                    />

                                    <Link href={`/games/${game.id}`}>
                                      <h2 className='text-md pl-5 font-semibold text-white '>
                                        {game.name}
                                      </h2>
                                    </Link>
                                  </div>
                                  <div className='flex items-center gap-10'>
                                    <div className='flex gap-1'>
                                      {game.parent_platforms.map((pl) => {
                                        const PlatformIcon =
                                          platformIcons[pl.name]

                                        if (PlatformIcon) {
                                          return (
                                            <div key={pl.id}>
                                              <PlatformIcon w='20' h='20' />
                                            </div>
                                          )
                                        } else {
                                          return null
                                        }
                                      })}
                                    </div>

                                    <div className='flex gap-1'>
                                      {game.genres.map((pl) => (
                                        <h2 key={pl.id}>{pl.name}</h2>
                                      ))}
                                    </div>
                                  </div>

                                  <div className='px-6'>
                                    <h3 className='font-bold text-white'>
                                      $ {game.price}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    )}
                  </div>
                  {/* <!-- pagination --> */}
                  <Pagination
                    setPagina={setPagina}
                    maximo={maximo}
                    pagina={pagina}
                  />
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  )
}
