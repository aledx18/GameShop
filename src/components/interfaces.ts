export interface Genre {
  id: string
  gameId: string
  name: string
}
export interface ShortScreenshot {
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
  released: Date
  background_image: string
  rating: number
  metacritic: number
  updated: Date
  stores: Genre[]
  short_screenshots: ShortScreenshot[]
  parent_platforms: Genre[]
  genres: Genre[]
}
