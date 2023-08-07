import Author from "../../interfaces/author"
import DateFormatter from "../misc/date-formatter"

type Props = {
  author?: Author,
  dateCreated?: string,
  dateModified?: string
}

const PostMeta = ({
  author,
  dateCreated,
  dateModified
}: Props) => {
  if (!(author || dateCreated)) return null;
  return (
    <>
      <div className="flex items-center">
        {author && (
          <div className="flex shrink-0 mr-3">
            <a className="relative" href="#0">
              <span className="absolute inset-0 -m-px" aria-hidden="true"><span className="absolute inset-0 -m-px bg-white rounded-full"></span></span>
              <img className="relative rounded-full" src={author.picture} width="32" height="32" alt="Author" />
            </a>
          </div>
        )}
        <div>
          {author && (
            <>
              <span className="text-gray-600">By </span>
              <a className="font-medium hover:underline" href="#0">{author.name}</a>
            </>
          )}
          {author && dateCreated && <span className="text-gray-600"> · </span>}
          {dateCreated && (
            <span className="text-gray-600">
              🗓 <DateFormatter dateString={dateCreated} />
            </span>
          )}
          {dateCreated && dateModified && <span className="text-gray-600"> · </span>}
          {dateModified && (
            <span className="text-gray-600">
              📝 <DateFormatter dateString={dateModified} />
            </span>
          )}
        </div>
      </div>
    </>
  )
}

export default PostMeta;
