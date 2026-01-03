import { pool } from '../db/connection.js';

export async function saveForecast(data) {
  const {
    city,
    latitude,
    longitude,
    source,
    forecast
  } = data;

  if (!city || !forecast || !Array.isArray(forecast)) {
    console.error('Forecast inválido:', data);
    return;
  }

  const query = `
    INSERT INTO weather_forecast
    (
      city,
      latitude,
      longitude,
      forecast_date,
      min_temp,
      max_temp,
      humidity,
      weather,
      source
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    ON CONFLICT (city, forecast_date, source) DO NOTHING
  `;

  for (const day of forecast) {
    try {
      await pool.query(query, [
        city,
        latitude,
        longitude,
        day.date,
        day.min_temp,
        day.max_temp,
        day.humidity,
        day.weather,
        source
      ]);
    } catch (error) {
      console.error('Error guardando forecast:', error.message);
    }
  }
}
