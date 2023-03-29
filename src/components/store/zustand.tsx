import { create } from 'zustand'
import { Game } from '../interfaces'

interface StoreState {
  games: Game[]
  setGames: (games: Game[]) => void
}

const useStore = create<StoreState>((set) => ({
  games: [],
  setGames: (game: Game[]) => set(() => ({ games: game }))
}))

export default useStore
