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
  if (!req.query.slug) {
    res.status(400).json({ message: 'Bad request need slug' })
    return res.end()
  }
  // cambiar por req.body
  const slug = req.query.slug as string

  try {
    const gameBySlug = await prismadb.game.findMany({
      where: {
        slug: {
          startsWith: slug
        }
      },
      include: {
        stores: true,
        short_screenshots: true,
        parent_platforms: true,
        genres: true
      }
    })

    res.status(200).json(gameBySlug)
  } catch (error) {
    res.status(500).json({ message: error })
    return res.end()
  }
}
