import Link from "next/link"
import NotePreview from "./note-preview"

type Props = {
  backlinks: {
    [k: string]: {
      title: string
      excerpt: string
    }
  }
}

const Backlinks = ({ backlinks }: Props) => {
  return (
    <>
      {Object.keys(backlinks).map((slug) => {
        const post = backlinks[slug]
        return (
          <Link as={slug} href="[...slug]" className="col-span-1">
            <NotePreview title={post.title} content={post.excerpt} />
          </Link>
        )
      })}
    </>
  )
}

export default Backlinks