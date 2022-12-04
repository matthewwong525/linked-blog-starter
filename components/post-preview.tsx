import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'

type Props = {
  title: string
  coverImage?: string
  date?: string
  excerpt: string
  author?: Author
  slug: string
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <div>
      {coverImage && (
        <div className="mb-5">
          <CoverImage slug={slug} title={title} src={coverImage} />
        </div>
      )}
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/${slug}`}
          href="/[...slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      {date && (
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
      )}
      <p className="text-lg leading-relaxed mb-4 max-h-[300px] white whitespace-pre-line truncate">{excerpt}</p>
      {author && (<Avatar name={author.name} picture={author.picture} />)}
    </div>
  )
}

export default PostPreview
