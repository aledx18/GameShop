import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

async function getCurrentUser() {
  const res = await axios.get('/api/current')
  return res
}

export default function useCurrentUser() {
  const query = useQuery(['currentUser'], getCurrentUser)
  return query
}
