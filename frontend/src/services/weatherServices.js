import axios from "axios";

/**
 * URL base del backend de clima
 */
const API_BASE_URL = import.meta.env.VITE_WEATHER_API;

/**
 * Cliente axios configurado
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

/**
 * Obtiene el clima actual de una ciudad
 * Endpoint: GET /weather/current?city={city}
 */
export const getCurrentWeather = async (city) => {
  const response = await api.get("/weather/current", {
    params: { city },
  });
  return response.data;
};

/**
 * Obtiene la predicción de 5 días (incluyendo el actual)
 * Endpoint: GET /weather/forecast?city={city}
 */
export const getForecast = async (city) => {
  const response = await api.get("/weather/forecast", {
    params: { city },
  });
  return response.data;
};

/**
 * Obtiene la tendencia de temperatura
 * Por defecto devuelve 5 días
 * Endpoint: GET /weather/trend?city={city}&days={days}
 */
export const getTrend = async (city, days = 5) => {
  const response = await api.get("/weather/trend", {
    params: { city, days },
  });
  return response.data;
};

/**
 * Obtiene el historial climático de una ciudad
 * Endpoint: GET /weather/history?city={city}
 */
export const getHistory = async (city) => {
  const response = await api.get("/weather/history", {
    params: { city },
  });
  return response.data;
};
