import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '../../../libs/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }
  if (!req.query) {
    res.status(400).json({ message: 'Bad request need id' })
    return res.end()
  }
  const id = req.query.id as string

  try {
    if (id !== undefined) {
      const gameById = await prismadb.game.findUnique({
        where: {
          id
        },
        include: {
          stores: true,
          short_screenshots: true,
          parent_platforms: true,
          genres: true
        }
      })

      res.status(200).json(gameById)
    }
    res.status(400)
  } catch (error) {
    res.status(400)
  }
}
