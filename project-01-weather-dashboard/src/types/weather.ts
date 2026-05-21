export interface GeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  country_code: string
  admin1?: string
}

export interface CurrentWeatherData {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  is_day: number
  time: string
}

export interface WeatherResponse {
  latitude: number
  longitude: number
  timezone: string
  current_weather: CurrentWeatherData
  hourly: {
    time: string[]
    temperature_2m: number[]
    apparent_temperature: number[]
    relativehumidity_2m: number[]
    uv_index: number[]
  }
  daily: {
    time: string[]
    weathercode: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_sum: number[]
  }
}

export interface CityLocation {
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
}
