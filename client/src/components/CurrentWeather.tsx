import type { CurrentWeather as CurrentWeatherData } from "../types/weather";
import { WeatherIcon } from "./WeatherIcon";

interface CurrentWeatherProps {
  weather: CurrentWeatherData;
}

export const CurrentWeather = ({ weather }: CurrentWeatherProps) => {
  const updated = new Date(weather.updatedAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <section
      className="current-weather"
      aria-labelledby="weather-heading"
    >
      <header className="weather-header">
        <p className="current-weather__location">
          {weather.location}, {weather.country}
        </p>
        <h1 id="weather-heading" className="current-weather__heading">
          Current weather
        </h1>
      </header>

      <div className="weather-main">
        <WeatherIcon
          iconCode={weather.iconCode}
          iconLabel={weather.iconLabel}
        />
        <div className="weather-details">
          {weather.iconLabel && (
            <p className="current-weather__icon-label">{weather.iconLabel}</p>
          )}
          <p className="temp-display">
            <span className="temp-value">
              {weather.temperatureCelsius}
            </span>
            <span className="temp-unit">°C</span>
          </p>
          {weather.humidityPercent !== undefined && (
            <p className="current-weather__humidity">
              Humidity {weather.humidityPercent}%
            </p>
          )}
        </div>
      </div>

      {weather.outlook && (
        <p className="weather-outlook">{weather.outlook}</p>
      )}
      <p className="weather-description">{weather.description}</p>
      <p className="updated-timestamp">Updated {updated}</p>
    </section>
  );
};
