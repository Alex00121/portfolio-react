# Weather Dashboard

A real-time weather dashboard built with React, TypeScript, and Tailwind CSS. Features live weather data from the Open-Meteo API with no API key required.

## Features

- **Current conditions** — temperature, feels-like, humidity, wind speed & direction, UV index
- **7-day forecast** — daily high/low with weather icons
- **24-hour temperature chart** — Recharts area chart with gradient fill
- **City search** — debounced autocomplete using Open-Meteo geocoding (5 suggestions)
- **Geolocation** — auto-fetches weather for your current position on first load
- **Dark/light mode** — toggle with sun/moon button, dark by default
- **Persistence** — last searched city saved to localStorage
- **Skeleton loading** — animated pulse skeletons instead of spinners
- **Responsive** — single column on mobile, full layout on desktop

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Recharts
- lucide-react
- Open-Meteo API (free, no key needed)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## API

This project uses the free [Open-Meteo API](https://open-meteo.com/) — no API key required.

- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`
- **Forecast**: `https://api.open-meteo.com/v1/forecast`

## Build

```bash
npm run build
npm run preview
```
