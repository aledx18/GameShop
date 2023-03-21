import { useQuery } from '@tanstack/react-query'
import { Game } from './interfaces'
import { UrlAxios } from './urlAxios'

async function fetchAll(): Promise<Game[]> {
  const { data } = await UrlAxios.get<Game[]>('/getAll')

  return data
}
export default function useGetAllGames() {
  const query = useQuery(['allGames'], fetchAll, {
    refetchOnWindowFocus: false
  })
  return query
}
