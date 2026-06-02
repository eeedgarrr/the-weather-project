import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "./api/weather";
import { CurrentWeather } from "./components/CurrentWeather";
import { WeatherSkeleton } from "./components/WeatherSkeleton";
import "./App.css";
import { getErrorMessage } from "./utils/errors";

const App = () => {
  // handle isLoading, error, data
  const { data: weather, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["currentWeather"],
    queryFn: fetchCurrentWeather,
    retry: 1,
  });

  return (
    <main className="app">
      <div className="weather-container">
        {isLoading && <WeatherSkeleton />}
        {error && (
          <div className="error-panel" role="alert">
            <p className="error-message">{getErrorMessage(error)}</p>
            <button
              type="button"
              className="retry-button"
              onClick={() => {
                void refetch();
              }}
              disabled={isFetching}
            >
              {isFetching ? "Retrying..." : "Retry"}
            </button>
          </div>
        )}
        {weather && <CurrentWeather weather={weather} />}
      </div>
    </main>
  );
};

export default App;
