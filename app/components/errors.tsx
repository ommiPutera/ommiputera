import { useMatches } from '@remix-run/react'

function FourOhFour() {
  const matches = useMatches()
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <div>
      not found bro/ ga ada {pathname}
    </div>
  )
}

export { FourOhFour }