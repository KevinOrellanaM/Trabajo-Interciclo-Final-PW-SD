import express from 'express';
import { pool } from '../db/connection.js';

const router = express.Router();

router.get('/forecast', async (req, res) => { // Función para obtener el forecast de una ciudad
  const { city } = req.query;

  const { rows } = await pool.query(
    `
    SELECT
      forecast_date,
      min_temp,
      max_temp,
      humidity,
      weather,
      source
    FROM weather_forecast
    WHERE city = $1
    ORDER BY forecast_date
    `,
    [city]
  );

  res.json(rows);
});

export default router;
