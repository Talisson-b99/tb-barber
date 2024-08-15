interface NationalHoliday {
  date: Date
  localName: string
  name: string
  countryCode: string
  fixed: boolean
  global: boolean
  counties?: string
  launchYear?: number
  type: string
}

export async function getHollidays() {
  const response: NationalHoliday[] = await fetch(
    'https://date.nager.at/api/v3/PublicHolidays/2024/BR',
  ).then((res) => res.json())

  const holidays = response.map((holi) => {
    const date = new Date(holi.date)
    date.setDate(date.getDate() + 1)

    return date
  })
  // console.log(holidays)
  return holidays
}
