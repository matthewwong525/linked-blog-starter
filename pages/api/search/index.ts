import { Searcher } from 'fast-fuzzy';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts  } from '../../../lib/api'
import { getMDExcerpt } from '../../../lib/markdownToHtml';

const allPosts = getAllPosts([
  "slug", "title", "content", "author", "date"
]);
const searchIndex = allPosts.map((p) => {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: getMDExcerpt(p.content),
    date: p.date,
    author: p.author,
  }
});
const searcher = new Searcher(searchIndex, {keySelector: (obj) => `${obj.title}\n${obj.excerpt}`})

export default function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { q },
    method,
  } = req
  if (method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).send(`Method ${method} Not Allowed`)
  }
  let searchedPosts = searcher.search(q.toString(), { returnMatchData: true });
  res.status(200).json(searchedPosts.slice(0, 10))
}