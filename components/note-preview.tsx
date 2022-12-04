type Props = {
  title: string
  content: string
}

const NotePreview = ({ title, content }: Props) => {
  return (
    <span className="note-preview block col-span-2 max-w-[400px] rounded-md border border-black p-1 bg-white cursor-pointer">
      <span className="block font-bold text-lg">{title}</span>
      <span className="block font-normal text-base">{content}</span>
    </span>
  )
}

export default NotePreview