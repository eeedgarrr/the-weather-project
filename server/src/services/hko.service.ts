// internal dependency
import { HKO_API_BASE_URL } from "../config/hko.js";
import { createHkoApiError } from "../errors/httpErrors.js";
import type { HkoQueryParams } from "../types/hko/common.js";
import type { HkoLocalWeatherForecast } from "../types/hko/flw.js";
import type { HkoCurrentWeatherReport } from "../types/hko/rhrread.js";

export const fetchHkoData = async <T>(
  params: HkoQueryParams,
): Promise<T> => {
  const { dataType, lang } = params;

  const url = new URL(HKO_API_BASE_URL);
  url.searchParams.set("dataType", dataType);
  url.searchParams.set("lang", lang);

  let response: Response;

  try {
    response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
    });
  } catch {
    throw createHkoApiError("Failed to reach HKO API");
  }

  if (!response.ok) {
    throw createHkoApiError(
      `HKO API responded with status ${response.status}`,
      response.status >= 500 ? 502 : response.status,
    );
  }

  return response.json() as Promise<T>;
};
// to get forecastDesc, updateTime
export const fetchLocalWeatherForecast = (lang: HkoQueryParams["lang"]) =>
  fetchHkoData<HkoLocalWeatherForecast>({ dataType: "flw", lang });

//to get humidity, temperature, icon code, 
export const fetchCurrentWeatherReport = (lang: HkoQueryParams["lang"]) =>
  fetchHkoData<HkoCurrentWeatherReport>({ dataType: "rhrread", lang });
