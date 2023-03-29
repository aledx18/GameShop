import axios from 'axios'
import { Add, Game, Video } from './interfaces'

export async function fetchDetail(id: string) {
  const { data } = await axios.get<Game>(
    `http://localhost:3000/api/getByID?id=${id}`
  )
  return data
}

export async function fetchDetailMovie(slug: string) {
  const { data } = await axios.get<Video>(
    `https://api.rawg.io/api/games/${slug}/movies?key=${process.env.NEXT_PUBLIC_KEY}`
  )
  return data
}

export async function fetchDetailAdditions(slug: string) {
  const { data } = await axios.get<Add>(
    `https://api.rawg.io/api/games/${slug}/additions?key=${process.env.NEXT_PUBLIC_KEY}`
  )
  return data
}
