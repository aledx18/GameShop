import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Game } from './interfaces'

export default async function fetchAll(id: string) {
  const { data } = await axios.get<Game>(
    `http://localhost:3000/api/getByID?id=${id}`
  )
  console.log(data)
  return data
}
// export default async function useGetDetailGame(id: string) {
//   const query = useQuery(['GameId'], await fetchAll(id), {
//     refetchOnWindowFocus: false
//   })
//   return query
// }
