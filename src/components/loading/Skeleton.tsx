import { IconImg } from '../icons/icons'

export default function Skeleton() {
  const skeleton = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 }
  ]
  return (
    <div className='flex flex-wrap'>
      {skeleton.map((ske) => (
        <div
          key={ske.id}
          className='my-2 w-full rounded-md bg-grisOne lg:w-full'
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center rounded-md'>
              <div
                role='status'
                className='animate-pulse py-4 px-8 md:flex md:items-center md:space-y-0 md:space-x-8'
              >
                <IconImg />
              </div>

              <h2 className='text-md animate-pulse px-16 font-semibold text-white'>
                <div className='h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700' />
              </h2>
            </div>
            <div className='px-6'>
              <h3 className='font-bold text-white'>
                <div className='h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700' />
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
