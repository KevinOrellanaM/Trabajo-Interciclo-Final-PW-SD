export const weatherIconMap = {
  rain: "/images/icons/icon-12.svg",
  drizzle: "/images/icons/icon-12.svg",
  thunderstorm: "/images/icons/icon-11.svg",
  clear: "/images/icons/icon-1.svg",
  cloud: "/images/icons/icon-3.svg",
  snow: "/images/icons/icon-14.svg",
  mist: "/images/icons/icon-6.svg",
  fog: "/images/icons/icon-6.svg",
  default: "/images/icons/icon-1.svg",
};

export const getWeatherIcon = (weatherText) => {
  if (!weatherText) return weatherIconMap.default;

  const text = weatherText.toLowerCase();

  if (text.includes("rain")) return weatherIconMap.rain;
  if (text.includes("drizzle")) return weatherIconMap.drizzle;
  if (text.includes("thunder")) return weatherIconMap.thunderstorm;
  if (text.includes("clear")) return weatherIconMap.clear;
  if (text.includes("cloud")) return weatherIconMap.cloud;
  if (text.includes("snow")) return weatherIconMap.snow;
  if (text.includes("mist") || text.includes("fog")) return weatherIconMap.mist;

  return weatherIconMap.default;
};


