export const HKO_API_BASE_URL =
  process.env.HKO_API_BASE_URL ??
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php";

export const DEFAULT_HKO_LANG = "en" as const;

export const HKO_LANGS = ["en", "tc", "sc"] as const;
