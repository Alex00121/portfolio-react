export function getWeatherEmoji(code: number, isDay = 1): string {
  if (code === 0) return isDay ? '☀️' : '🌙'
  if (code <= 2) return isDay ? '⛅' : '🌤️'
  if (code === 3) return '☁️'
  if (code <= 49) return '🌫️'
  if (code <= 59) return '🌧️'
  if (code <= 69) return '🌨️'
  if (code <= 79) return '❄️'
  if (code <= 82) return '🌧️'
  if (code <= 84) return '🌨️'
  if (code <= 86) return '❄️'
  if (code <= 99) return '⛈️'
  return '🌤️'
}

export function getWeatherDescription(code: number): string {
  const map: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Icy fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight showers',
    81: 'Moderate showers',
    82: 'Violent showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm w/ slight hail',
    99: 'Thunderstorm w/ heavy hail',
  }
  return map[code] ?? 'Unknown'
}

export function formatDay(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

export function formatHour(timeStr: string): string {
  const date = new Date(timeStr)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
}

export function getWindDirection(degrees: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(degrees / 45) % 8]
}
