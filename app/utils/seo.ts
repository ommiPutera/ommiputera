export function getSocialMetas({
  url,
  title = 'Helping people make the world a better place through quality software',
  description = 'Make the world better with software',
  keywords = '',
}: {
  image?: string
  url: string
  title?: string
  description?: string
  keywords?: string
}) {
  return [
    {title},
    {description},
    {keywords},
    {'og:url': url},
    {'og:title': title},
    {'og:description': description},
  ]
}
