import fetchAll from '@/components/gameDetail'
import Image from 'next/image'
import Link from 'next/link'

export default function Detail({ data }) {
  // const { data } = useGetDetailGame(id)
  // console.log(data)
  // style='filter: grayscale(1) contrast(1.2) opacity(0.16);'
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
          <Image
            src={data.background_image}
            fill
            alt='image'
            loading='lazy'
            className='h-auto w-auto rounded-lg bg-cover bg-center object-cover object-center'
          />
        </div>

        <div className='container mx-auto flex px-20 py-24'>
          <div className='relative z-10 mt-80 flex h-full w-full flex-col rounded-2xl bg-blackFondo'>
            <div className='flex items-start justify-around rounded-2xl px-4 pt-4'>
              <div className='flex flex-col'>
                <div className='flex gap-2'>
                  {data.short_screenshots.slice(1, 5).map((item) => (
                    <Image
                      src={item.image}
                      key={item.id}
                      width={200}
                      height={400}
                      alt='image'
                      loading='lazy'
                      className='rounded-lg transition-transform hover:z-10 hover:scale-110'
                    />
                  ))}
                </div>

                <div className='mr-4 mt-4'>
                  <h4 className='py-2 text-2xl font-semibold'>
                    About the game
                  </h4>
                  <p className='text-md py-2 text-grisClaro'>
                    {' '}
                    {data.description}
                  </p>
                </div>
              </div>

              <div className='flex flex-col items-center justify-center rounded-2xl bg-grisTwo px-14 pb-40 text-center'>
                <h2 className='px-20 py-2 text-xl font-semibold text-white'>
                  {data.name}
                </h2>
                <h4 className='py-2 text-lg font-medium text-white'>
                  Price: ${data.price}
                </h4>
                <p className='text-md'>{data.released}</p>
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
  const data = await fetchAll(id)

  return { props: { data } }
}
