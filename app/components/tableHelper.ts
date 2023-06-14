import {format} from 'date-fns'

const sliceStr = (str: string, max?: number) => {
  let MAX_CHAR = max ?? 25
  if (str.length > MAX_CHAR) return str.slice(0, MAX_CHAR).trim() + '..'
  return str
}

const formatDate = (date: Date, customFormat?: string) => {
  const formated = format(new Date(date), customFormat ?? 'dd MMM yyyy')
  return formated
}

const tableUtils = {
  sliceStr,
  formatDate,
}

export {tableUtils}
