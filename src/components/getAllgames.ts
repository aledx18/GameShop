import { useQuery } from '@tanstack/react-query'
import { UrlAxios } from './urlAxios'
import { Game } from './interfaces'
import useStore from './store/zustand'

async function fetchAll(): Promise<Game[]> {
  const { data } = await UrlAxios.get<Game[]>('/getAll')

  return data
}

export default function useGetAllGames() {
  const { setGames, games } = useStore()

  const query = useQuery(['allGames'], fetchAll, {
    onSuccess: (data) => {
      if (games.length === 0) {
        setGames(data)
      }
    },
    refetchOnWindowFocus: false
  })

  return query
}
