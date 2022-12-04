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
      <h2 className="text-2xl">Backlinks</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.keys(backlinks).map((slug) => {
          const post = backlinks[slug]
          return (
            <NotePreview title={post.title} content={post.excerpt}/>
          )
        })}
      </div>
    </>
  )
}

export default Backlinks