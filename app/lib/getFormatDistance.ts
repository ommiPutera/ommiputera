export const formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'kurang dari {{count}} detik',
  },

  xSeconds: {
    one: '1 second',
    other: '{{count}} detik',
  },

  halfAMinute: 'half a minute',

  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'kurang dari {{count}} menit',
  },

  xMinutes: {
    one: '1 minute',
    other: '{{count}} menit',
  },

  aboutXHours: {
    one: 'about 1 hour',
    other: 'sekitar {{count}} jam',
  },

  xHours: {
    one: '1 jam',
    other: '{{count}} jam',
  },

  xDays: {
    one: '1 hari',
    other: '{{count}} hari',
  },

  aboutXMonths: {
    one: 'about 1 month',
    other: 'sekitar {{count}} bulan',
  },

  xMonths: {
    one: '1 month',
    other: '{{count}} bulan',
  },

  aboutXYears: {
    one: 'about 1 year',
    other: 'sekitar {{count}} tahun',
  },

  xYears: {
    one: '1 year',
    other: '{{count}} tahun',
  },

  overXYears: {
    one: 'over 1 year',
    other: 'lebih dari {{count}} years',
  },

  almostXYears: {
    one: 'almost 1 year',
    other: 'hampir {{count}} years',
  },
}

type formatType = keyof typeof formatDistanceLocale

export default function getFormatDistance(
  token: string,
  count: number,
  options: any,
) {
  options = options || {}

  var result
  if (typeof formatDistanceLocale[token as formatType] === 'string') {
    result = formatDistanceLocale[token as formatType]
  } else if (count === 1) {
    // @ts-ignore
    result = formatDistanceLocale[token as formatType].one
  } else {
    // @ts-ignore
    result = formatDistanceLocale[token as formatType].other.replace(
      '{{count}}',
      count,
    )
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      return result + ' yang lalu'
    }
  }
  return result
}
