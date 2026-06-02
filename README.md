# The Weather Project

Full-stack app for current Hong Kong weather: **React (Vite)** frontend and **Express** backend, both TypeScript, in separate `client/` and `server/` folders.

## Stack

- **Client:** React 18, Vite, TypeScript
- **Server:** Express, TypeScript
- **Data:** [HKO Open Data API](https://data.weather.gov.hk/weatherAPI/opendata/weather.php) — `flw` (forecast text) and `rhrread` (temperature, humidity, icon)

Temperature and humidity use the **Hong Kong Observatory** station when HKO provides it.

## Project structure

```
├── client/     # frontend (port 5173)
└── server/     # API (port 3001)
```

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/weather/current` | Merged current weather. Optional query: `lang` = `en` (default), `tc`, or `sc` |

Example response from `GET /api/weather/current`:

```json
{
  "location": "Hong Kong Observatory",
  "country": "Hong Kong",
  "temperatureCelsius": 29,
  "description": "Mainly cloudy with a few showers...",
  "updatedAt": "2026-05-31T02:02:00+08:00",
  "iconCode": 76,
  "iconLabel": "Mainly Cloudy",
  "humidityPercent": 79,
  "outlook": "Very hot during the day...",
  "source": "hko"
}
```

## Configuration (optional)

Server settings can be overridden with environment variables. See `server/.env.example`.

```bash
cd server
cp .env.example .env   # optional — defaults work without this
```

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `3001` | Express listen port |
| `HKO_API_BASE_URL` | HKO production URL | Open Data API endpoint |

To use a `.env` file, export variables before starting (e.g. `export $(grep -v '^#' .env | xargs)`), or set them in your shell. No API keys are required for HKO.

## Run locally

```bash
# Terminal 1 — API
cd server
npm install
npm run dev

# Terminal 2 — UI
cd client
npm install
npm run dev
```

Open http://localhost:5173. Vite proxies `/api` to port 3001.

## Run with Docker Compose

From the project root:

```bash
docker compose up --build
```

Then open http://localhost:5173.

What this starts:
- `server` container on `localhost:3001`
- `client` container on `localhost:5173`

Stop containers:

```bash
docker compose down
```

## Build

```bash
cd server && npm run build && npm start
cd client && npm run build && npm run preview
```
