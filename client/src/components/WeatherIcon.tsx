import { getHkoIconImageUrl } from "../utils/hkoIcon";

interface WeatherIconProps {
  iconCode?: number;
  iconLabel?: string;
}

export const WeatherIcon = ({ iconCode, iconLabel }: WeatherIconProps) => {
  const label = iconLabel ?? "N/A";

  if (iconCode !== undefined) {
    return (
      <img
        className="weather-icon weather-icon--hko"
        src={getHkoIconImageUrl(iconCode)}
        alt={label}
        width={80}
        height={80}
      />
    );
  }

  return null;
};
