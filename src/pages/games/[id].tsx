/* eslint-disable multiline-ternary */
import { Add, Game, Video } from '@/components/interfaces'
import {
  fetchDetail,
  fetchDetailAdditions,
  fetchDetailMovie
} from '@/components/gameDetail'
import Image from 'next/image'
import Link from 'next/link'
import { IconDots } from '@/components/icons/icons'
import { Fragment, useState } from 'react'

interface DetailProps {
  data: Game
  video: Video
  additions: Add
}

export default function Detail({ data, video, additions }: DetailProps) {
  const [spinner, setSpinner] = useState(true)

  function handleLoad() {
    setSpinner(false)
  }

  return (
    <section className='mt-32'>
      <div className='my-2 flex items-center overflow-x-auto whitespace-nowrap py-2'>
        <Link href='/' className='text-gray-600 dark:text-gray-200'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
          </svg>
        </Link>

        <span className='mx-2 text-gray-500 rtl:-scale-x-100 dark:text-gray-300'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </span>
        <Link
          href='/games'
          className='text-gray-600 hover:underline dark:text-gray-200'
        >
          Shop
        </Link>
        <span className='mx-2 text-gray-500 rtl:-scale-x-100 dark:text-gray-300'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </span>
        <div className='text-gray-600 dark:text-gray-200'>{data.name}</div>
      </div>
      <div className='body-font relative'>
        <div className='absolute inset-0 h-[500px] opacity-40'>
          {spinner && (
            <div className='flex items-center justify-center'>
              <IconDots w='80' h='40' />
            </div>
          )}
          <Image
            src={data.background_image}
            fill
            priority
            alt='image'
            onLoad={handleLoad}
            className={`${
              spinner ? 'invisible' : 'visible'
            } h-auto w-auto rounded-lg bg-cover bg-center object-cover object-center`}
          />
        </div>

        <div className='container mx-auto flex px-20 py-24'>
          <div className='relative mt-80 flex h-full w-full flex-col rounded-2xl bg-blackFondo'>
            <div className='flex justify-around gap-2 rounded-2xl p-4'>
              <div className='flex flex-col'>
                <div className='flex snap-x scroll-pl-2 gap-3 scroll-smooth'>
                  {video.results.length > 0 && (
                    <video
                      src={video.results[0]?.data.max}
                      autoPlay
                      loop
                      muted
                      width={210}
                      height={400}
                      className='rounded-lg transition-transform duration-300 ease-in-out hover:scale-105'
                    />
                  )}
                  {data.short_screenshots.slice(0, 4).map((item) => (
                    <Fragment key={item.id}>
                      {spinner && (
                        <div className='m-0 flex items-center justify-center p-0'>
                          <IconDots w='40' h='40' />
                        </div>
                      )}

                      <Image
                        src={item.image}
                        key={item.id}
                        width={200}
                        height={400}
                        loading='lazy'
                        alt='image'
                        className={`${
                          spinner ? 'invisible' : 'visible'
                        } mb-2 snap-end rounded-lg transition-transform duration-300 ease-in-out hover:scale-105`}
                      />
                    </Fragment>
                  ))}
                </div>

                <div className='my-4 mr-4'>
                  <h4 className='py-2 text-2xl font-semibold'>
                    About the game
                  </h4>
                  <p className='text-md py-2 text-grisClaro'>
                    {data.description}
                  </p>
                </div>
              </div>
              <article className='rounded-xl border border-grisTwo bg-grisTwo p-4 text-center'>
                <div className='items-center gap-4 lg:mx-36 lg:block' />
                <h2 className='text-2xl font-semibold text-white'>
                  {data.name}
                </h2>
                <h3 className='text-md py-4 text-[#4b5563] dark:text-grisClaro'>
                  Price:{' '}
                  <span className='text-lg text-white'>${data.price}</span>
                </h3>
                <div className='flex flex-col gap-2'>
                  <button className='group relative mr-2 inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#980f90] to-[#f5d31a] p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500 dark:text-white'>
                    <span className='relative w-full rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-grisTwo dark:bg-grisOne'>
                      Buy Now
                    </span>
                  </button>
                  <button className=' mt-0 inline-flex w-full items-center justify-center gap-1 rounded-lg bg-grisOne px-5 py-2.5 shadow-md hover:bg-blackOne hover:text-white focus:outline-none'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-shopping-cart'
                      width={24}
                      height={24}
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                      <path d='M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                      <path d='M17 17h-11v-14h-2' />
                      <path d='M6 5l14 1l-1 7h-13' />
                    </svg>

                    <span className='text-sm font-medium'>Add to Cart</span>
                  </button>
                </div>

                <div className='mt-4 space-y-2 text-left'>
                  <div className='flex h-full flex-col gap-1 rounded-lg border border-grisOne py-4 px-1'>
                    <h4 className=' text-white'>
                      Genres:{' '}
                      <span className='text-sm text-grisClaro'>
                        {data.genres.map((item) => item.name).join(', ')}
                      </span>
                    </h4>
                    <h4 className=' text-white'>
                      Metacritic:{' '}
                      <span className='text-sm text-grisClaro'>
                        {data.metacritic}
                      </span>
                    </h4>
                    <h4 className='text-white'>
                      Rating:{' '}
                      <span className='text-sm text-grisClaro'>
                        {data.rating}
                      </span>
                    </h4>
                    <h4 className=' text-white'>
                      Released date:{' '}
                      <span className='text-sm text-grisClaro'>
                        {data.released}
                      </span>
                    </h4>
                    <h4 className=' text-white'>
                      Platforms:{' '}
                      <span className='text-sm text-grisClaro'>
                        {data.stores.map((item) => item.name).join(', ')}
                      </span>
                    </h4>
                  </div>
                </div>
              </article>
            </div>
            <div className='p-4'>
              <h1>Dlcs :</h1>
              <div className='flex flex-wrap items-center gap-2 text-center'>
                {additions.results.map((item) => (
                  <div
                    key={item.id}
                    className='flex h-28 flex-col items-center rounded-lg bg-grisTwo p-4'
                  >
                    <h2 className='text-md text-grisClaro'>{item.name}</h2>
                    {item.background_image && (
                      <Image
                        className='h-auto rounded-lg'
                        src={item.background_image}
                        width={100}
                        alt='iamge'
                        height={100}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context: { query: { id: string } }) {
  const { id } = context.query

  const data = await fetchDetail(id)
  const video = await fetchDetailMovie(data.slug)
  const additions = await fetchDetailAdditions(data.slug)

  return { props: { data, video, additions } }
}
