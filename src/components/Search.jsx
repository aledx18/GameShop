/* eslint-disable camelcase */
import { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'
import Image from 'next/image'

const AutocompleteItem = ({ id, name, background_image }) => {
  return (
    <li>
      <Link href={`/games/${id}`}>
        <div className='flex items-center gap-4 p-4 hover:bg-grisOne'>
          <Image
            src={background_image}
            alt={name}
            width={50}
            height={50}
            className='rounded-sm'
          />
          <div>
            <h3 className='text-sm font-semibold'>{name}</h3>
          </div>
        </div>
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
        placeholder: 'Search',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: 'offers-next-api',
            getItems: ({ query }) => {
              if (query) {
                return fetch(`/api/getByName?slug=${query}`).then((res) =>
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
    <form ref={formRef} className='mx-4 flex justify-center' {...formProps}>
      <fieldset className='w-full space-y-1 dark:text-gray-100'>
        <label for='Search' className='hidden'>
          Search
        </label>
        <div className='relative'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
            <svg
              aria-hidden='true'
              class='h-5 w-5 text-gray-500 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </span>
          <input
            ref={inputRef}
            {...inputProps}
            type='search'
            name='Search'
            placeholder='Search...'
            className='w-32 rounded-md py-3 pl-10 text-sm focus:outline-none dark:bg-grisTwo dark:text-gray-100 focus:dark:bg-blackFondo sm:w-auto'
          />
        </div>
      </fieldset>

      {autocompleteState.isOpen && (
        <div
          className='absolute z-10 mt-14 overflow-hidden rounded-lg border border-blackFondo bg-grisTwo shadow-lg'
          ref={panelRef}
          {...autocomplete.getPanelProps()}
        >
          {autocompleteState.collections.map((collection, index) => {
            const { items } = collection
            return (
              <section key={`section-${index}`}>
                {items.length > 0 && (
                  <ul {...autocomplete.getListProps()}>
                    {items.map((item) => (
                      <AutocompleteItem key={item.id} {...item} />
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </div>
      )}
    </form>
  )
}
