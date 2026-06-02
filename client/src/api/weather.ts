import type { CurrentWeather } from "../types/weather";
import axios from "axios";

export const fetchCurrentWeather = async (): Promise<CurrentWeather> => {
  try {
    const response = await axios.get<CurrentWeather>("/api/weather/current");
    return response.data;
  } catch (error) {
    console.log("🚀 ~ fetchCurrentWeather ~ error:", error);

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
