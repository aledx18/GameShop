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
  if (!req.query.id) {
    res.status(400).json({ message: 'Bad request need id' })
    return res.end()
  }
  const id = req.query.id as string

  try {
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
  } catch (error) {
    res.status(500).json({ error })
  }
}
