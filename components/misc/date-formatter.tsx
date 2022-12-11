import { parseISO, format } from 'date-fns'

type Props = {
  dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
  try {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
  } catch (e) {
    return null
  }
}

export default DateFormatter
