import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { getPostBySlug } from '../../../lib/api'

export default async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { slug},
    method,
  } = req
  if (method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send(`Method ${method} Not Allowed`)
  }
  const post = await getPostBySlug(path.join(...(slug as string[])), ['title', 'excerpt']);
  res.status(200).json(post);
}