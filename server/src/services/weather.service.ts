import { createHkoApiError } from "../errors/httpErrors.js";
import type { HkoLang } from "../types/hko/common.js";
import type { CurrentWeather } from "../types/weather.js";
import { getIconLabel } from "../utils/iconMapper.js";
import {
  fetchCurrentWeatherReport,
  fetchLocalWeatherForecast,
} from "./hko.service.js";

const DEFAULT_LOCATION = "Hong Kong";
const HKO_OBSERVATORY_PLACE = "Hong Kong Observatory";

const getTemperature = (
  report: Awaited<ReturnType<typeof fetchCurrentWeatherReport>>,
): number => {
  const readings = report.temperature?.data ?? [];
  const observatory = readings.find(
    (entry) => entry.place === HKO_OBSERVATORY_PLACE,
  );

  if (observatory) {
    return observatory.value;
  }

  if (readings.length > 0) {
    return readings[0].value;
  }

  throw createHkoApiError("No temperature data available from HKO");
};

const getHumidity = (
  report: Awaited<ReturnType<typeof fetchCurrentWeatherReport>>,
): number | undefined => {
  const readings = report.humidity?.data ?? [];
  const observatory = readings.find(
    (entry) => entry.place === HKO_OBSERVATORY_PLACE,
  );

  return observatory?.value ?? readings[0]?.value;
};

export const getCurrentWeather = async (
  lang: HkoLang = "en",
): Promise<CurrentWeather> => {
  const [forecast, report] = await Promise.all([
    fetchLocalWeatherForecast(lang),
    fetchCurrentWeatherReport(lang),
  ]);

  const iconCode = report.icon?.[0];
  const temperatureCelsius = getTemperature(report);
  const humidityPercent = getHumidity(report);

  return {
    location: HKO_OBSERVATORY_PLACE,
    country: DEFAULT_LOCATION,
    temperatureCelsius,
    description: forecast.forecastDesc,
    updatedAt: report.updateTime || forecast.updateTime,
    iconCode,
    iconLabel: iconCode !== undefined ? getIconLabel(iconCode) : undefined,
    humidityPercent,
    source: "hko",
    outlook: forecast.outlook,
  };
};
