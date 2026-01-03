import { pool } from '../db/connection.js';

export async function saveWeather(data) { // Función para guardar datos
  const { 
    city,
    temperature,
    humidity,
    latitude,
    longitude,
    source,
    timestamp
  } = data; // datos estructurados desde RabbitMQ

  // Validación mínima
  if (!city || temperature == null || humidity == null || !source) {
    console.error('Datos incompletos:', data);
    return;
  }

  const query = `
    INSERT INTO weather_data
    (city, temperature, humidity, latitude, longitude, source, timestamp)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  try {
    await pool.query(query, [
      city,
      temperature,
      humidity,
      latitude,
      longitude,
      source,
      timestamp || new Date()
    ]);
  } catch (error) {
    console.error('Error guardando clima:', error.message);
  }
}
