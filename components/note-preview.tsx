type Props = {
  title: string
  content: string
}

const NotePreview = ({ title, content }: Props) => {
  return (
    <span className="note-preview block col-span-2 max-w-[400px] rounded-md border-2 border-black p-1 bg-white">
      <span className="block font-bold text-xl">{title}</span>
      <span className="block font-normal text-lg">{content}</span>
    </span>
  )
}

export default NotePreview