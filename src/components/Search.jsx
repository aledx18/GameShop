/* eslint-disable camelcase */
import { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'

const AutocompleteItem = ({ id, name, background_image, price }) => {
  return (
    <li>
      <Link href={`/games/${id}`}>
        <div className='flex gap-4 p-4 hover:bg-blue-300'>
          <img
            src={background_image}
            alt={name}
            className='h-12 w-12 object-contain'
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
    <form ref={formRef} className='mx-20 flex justify-center' {...formProps}>
      <input
        ref={inputRef}
        className='relative appearance-none rounded-lg p-4 pl-10 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-grisClaro  dark:border-gray-600 dark:bg-grisTwo dark:text-white dark:placeholder-gray-200'
        {...inputProps}
      />
      {autocompleteState.isOpen && (
        <div
          className='absolute top-0 left-0 z-10 mt-16 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg'
          ref={panelRef}
          {...autocomplete.getPanelProps()}
        >
          {autocompleteState.collections.map((collection, index) => {
            const { items } = collection
            console.log({ items })
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
