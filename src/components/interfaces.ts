interface Genre {
  id: string
  gameId: string
  name: string
}
interface ShortScreenshot {
  id: string
  gameId: string
  image: string
}
export interface Game {
  id: string
  slug: string
  name: string
  price: number
  description: string
  released: string
  background_image: string
  rating: number
  metacritic: number
  updated: string
  stores: Genre[]
  short_screenshots: ShortScreenshot[]
  parent_platforms: Genre[]
  genres: Genre[]
}

export interface Data {
  '480': string
  max: string
}
export interface Resultv {
  id: number
  name: string
  preview: string
  data: Data
}

export interface Video {
  count: number
  next: null
  previous: null
  results: Resultv[]
}

interface Result {
  id: number
  slug: string
  name: string
  released: string
  tba: boolean
  background_image: null
  rating: number
  rating_top: number
  ratings: any[]
  ratings_count: number
  reviews_text_count: number
  added: number
  added_by_status: any[]
  metacritic: null
  playtime: number
  suggestions_count: number
  updated: string
  user_game: null
  reviews_count: number
  community_rating: number
  saturated_color: string
  dominant_color: string
  platforms: any[]
  parent_platforms: any[]
  genres: any[]
  stores: any[]
  clip: null
  tags: any[]
  esrb_rating: any[]
  short_screenshots: any[]
}

export interface Add {
  count: number
  next: null
  previous: null
  results: Result[]
}
