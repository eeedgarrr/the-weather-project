export const WeatherSkeleton = () => {
  return (
    <section className="weather-skeleton" aria-label="Loading weather">
      <div className="skeleton-line skeleton-line--title" />
      <div className="skeleton-line skeleton-line--subtitle" />
      <div className="skeleton-main">
        <div className="skeleton-circle" />
        <div className="skeleton-details">
          <div className="skeleton-line skeleton-line--label" />
          <div className="skeleton-line skeleton-line--temp" />
          <div className="skeleton-line skeleton-line--small" />
        </div>
      </div>
      <div className="skeleton-line skeleton-line--body" />
      <div className="skeleton-line skeleton-line--body short" />
      <div className="skeleton-line skeleton-line--small" />
    </section>
  );
};
