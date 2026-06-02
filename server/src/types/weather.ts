
export interface CurrentWeather {
  location: string;
  country: string;
  temperatureCelsius: number;
  description: string;
  updatedAt: string;
  iconCode?: number;
  iconLabel?: string;
  humidityPercent?: number;
  outlook?: string;
  source: "hko";
}
