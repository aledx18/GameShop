import { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'

const AutocompleteItem = ({ id, title, img, price }) => {
  return (
    <li>
      <Link href={`/detail/${id}`}>
        <a className='flex gap-4 p-4 hover:bg-blue-300'>
          <img src={img} alt={title} className='h-12 w-12 object-contain' />
          <div>
            <h3 className='text-sm font-semibold'>{title}</h3>
            <p className='text-xs text-gray-600'>{price}</p>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default function Search(props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  })

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Search for game',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: 'next-api',
            getItems: ({ query }) => {
              if (query) {
                return fetch(`/api/games?slug=${query}`).then((res) =>
                  res.json()
                )
              }
            }
          }
        ],
        ...props
      }),
    [props]
  )
  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  })
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current
  })

  return (
    <form ref={formRef} {...formProps}>
      <div className='px-4'>
        <label
          htmlFor='search'
          className='sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Search
        </label>
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              aria-hidden='true'
              className='h-5 w-5 text-gray-500 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
          <input
            className='block w-full appearance-none rounded-lg bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-grisClaro  dark:border-gray-600 dark:bg-grisTwo dark:text-white dark:placeholder-gray-200'
            ref={inputRef}
            {...inputProps}
          />
        </div>
      </div>
    </form>
  )
}
