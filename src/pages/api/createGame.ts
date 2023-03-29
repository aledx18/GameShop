import { NextApiRequest, NextApiResponse } from 'next'
// import prismadb from '../../../libs/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const games = await fetch(
    //   'https://api.rawg.io/api/games?dates=2013-01-01%2C2022-12-31&key=914982c38be948199378f6cd3d11684d&ordering=-added&page=4&page_size=26'
    // )
    //   .then((response) => response.json())
    //   .then(async (data) => {
    //     const gamesWithDesc = []
    //     for (let i = 0; i < data.results.length; i++) {
    //       const game = data.results[i]
    //       const slug = game.slug

    //       const gameDescResponse = await fetch(
    //         `https://api.rawg.io/api/games/${slug}?key=914982c38be948199378f6cd3d11684d`
    //       )
    //       const gameDescData = await gameDescResponse.json()

    //       const gameWithDesc = {
    //         slug: game.slug,
    //         name: game.name,
    //         released: game.released,
    //         background_image: game.background_image,
    //         rating: game.rating,
    //         metacritic: game.metacritic || Math.round(Math.random() * 30) + 50,
    //         updated: game.updated,
    //         price: +(Math.random() * (45.5 - 3.9) + 3.9).toFixed(2),
    //         stores: {
    //           create: game.stores.map((sto: any) => ({
    //             name: sto.store.name
    //           }))
    //         },
    //         short_screenshots: {
    //           create: game.short_screenshots.map((img: any) => ({
    //             image: img.image
    //           }))
    //         },
    //         parent_platforms: {
    //           create: game.parent_platforms.map((pt: any) => ({
    //             name: pt.platform.name
    //           }))
    //         },
    //         genres: {
    //           create: game.genres.map((gen: any) => ({
    //             name: gen.name
    //           }))
    //         },
    //         description: gameDescData.description_raw
    //       }

    //       gamesWithDesc.push(gameWithDesc)
    //     }

    //     return gamesWithDesc
    //   })

    // for (const game of games) {
    //   await prismadb.game.create({
    //     data: game
    //   })
    // }

    return res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error })
  }
}
