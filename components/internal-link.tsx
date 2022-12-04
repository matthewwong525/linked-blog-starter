import Link from "next/link";
import NotePreview from "./note-preview";
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

type Props = {
  href: string
  children?: React.ReactNode
}

const InternalLink = ({ href, children }: Props) => {
  const { data } = useSWR(`/api/post-preview/${href}`, fetcher)
  return (
    <span className="internal-link-container">
      <Link href={href} className="internal-link">{children}</Link>
      {data && (<NotePreview title={data.title} content={data.excerpt} />)}
    </span>
  );
}

export default InternalLink;