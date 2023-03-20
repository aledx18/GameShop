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

  try {
    const allGames = await prismadb.game.findMany({
      include: {
        stores: true,
        short_screenshots: true,
        parent_platforms: true,
        genres: true
      }
    })

    res.status(200).json(allGames)
  } catch (error) {
    res.status(500).json({ message: error })
    return res.end()
  }
}
