import type { CurrentWeather } from "../types/weather";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, "");
const weatherEndpoint = `${apiBaseUrl ?? ""}/api/weather/current`;

export const fetchCurrentWeather = async (): Promise<CurrentWeather> => {
  try {
    const response = await axios.get<CurrentWeather>(weatherEndpoint);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // network error (no response)
      if (!error.response) {
        throw new Error("Could not reach the server");
      }

      const responseError = error.response.data as { error?: unknown };
      // BE responds with error (4xx/5xx)
      if (typeof responseError?.error === "string") {
        throw new Error(responseError.error);
      }
      // BE responds with generic error
      throw new Error(
        `Server error: ${error.response.status} ${error.response.statusText}`,
      );
    }
    // unknown error (fallback)
    throw new Error("Failed to load weather data");
  }
};
