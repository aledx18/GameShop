import { ChangeEvent, useState } from 'react'

interface Ipagination {
  pagina: number
  maximo: number
  setPagina: (pagina: number) => void
}

export default function Pagination({ pagina, setPagina, maximo }: Ipagination) {
  const [input, setInput] = useState(1)
  function nextPage() {
    if (pagina < Math.ceil(maximo)) {
      setInput(input + 1)
      setPagina(pagina + 1)
    }
  }

  function previousPage() {
    if (pagina > 1) {
      setInput(input - 1)
      setPagina(pagina - 1)
    }
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    setInput(value)
  }

  return (
    <div className='flex justify-center py-10'>
      <button
        onClick={previousPage}
        disabled={pagina === 1}
        className={`${
          pagina === 1 && 'cursor-not-allowed bg-blackOne'
        } mx-1 flex transform items-center justify-center rounded-md bg-white px-4 py-2 text-gray-700 transition-colors duration-300  hover:text-white rtl:-scale-x-100 dark:bg-grisOne dark:text-gray-200 dark:hover:bg-grisClaro dark:hover:text-gray-200`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      <input
        onChange={(e) => onChange(e)}
        disabled
        type='number'
        value={pagina}
        className='w-16 rounded-md bg-white px-4 py-2 text-gray-700 transition-colors duration-300 hover:text-white dark:bg-grisTwo dark:text-gray-200'
      />

      <button
        onClick={nextPage}
        className='mx-1 flex transform items-center justify-center rounded-md bg-white px-4 py-2 text-gray-700 transition-colors duration-300  hover:text-white rtl:-scale-x-100 dark:bg-grisOne dark:text-gray-200 dark:hover:bg-grisClaro dark:hover:text-gray-200'
      >
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
      </button>
    </div>
  )
}
