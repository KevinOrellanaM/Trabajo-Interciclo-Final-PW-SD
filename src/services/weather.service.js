import { pool } from '../db/connection.js';
import axios from 'axios';

const BACKEND_A_URL = 'http://backend_a:8000';

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

export async function getCurrentWeather(city) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM weather_data
    WHERE city = $1
    ORDER BY timestamp DESC
    LIMIT 1
    `,
    [city]
  );

  const today = new Date().toISOString().split('T')[0];

  if (rows.length) {
    const lastDate = rows[0].timestamp.toISOString().split('T')[0];
    if (lastDate === today) {
      return rows[0];
    }
  }

  // 🚀 Solo dispara la recolección
  await axios.get(
    `http://backend_a:8000/collect/${encodeURIComponent(city)}`
  );

  return {
    message: 'Datos en proceso de actualización',
    city
  };
}
