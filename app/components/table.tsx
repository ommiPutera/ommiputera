const sliceStr = (str: string, max?: number) => {
  let MAX_CHAR = max ?? 22
  if (str.length > MAX_CHAR) return str.slice(0, MAX_CHAR).trim() + '..'
  return str
}

const tableUtils = {
  sliceStr,
}

export {tableUtils}
