import express from 'express';
import { pool } from '../db/connection.js';

const router = express.Router();

//Clima actual de una ciudad (último registro)
router.get('/current', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'Ciudad requerida' });
  }

  try {
    const { rows } = await pool.query(
      `
      SELECT 
        city,
        temperature,
        humidity,
        latitude,
        longitude,
        source,
        timestamp
      FROM weather_data
      WHERE city = $1
      ORDER BY timestamp DESC
      LIMIT 1
      `,
      [city]
    );

    if (!rows.length) {
      return res.status(404).json({
        message: 'No hay datos para esta ciudad'
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error /current:', error);
    res.status(500).json({
      message: 'Error obteniendo clima actual'
    });
  }
});

//Obtener el hitsorial del clima de una ciudad
router.get('/history', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'Ciudad requerida' });
  }

  try {
    const { rows } = await pool.query(
      `
      SELECT 
        city,
        temperature,
        humidity,
        latitude,
        longitude,
        source,
        timestamp
      FROM weather_data
      WHERE city = $1
      ORDER BY timestamp DESC
      `,
      [city]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error /history:', error);
    res.status(500).json({
      message: 'Error obteniendo historial'
    });
  }
});

//Guardar una ciudad en favoritas
router.post('/favorite', async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ message: 'Ciudad requerida' });
  }

  try {
    await pool.query(
      `
      INSERT INTO favorites (city)
      VALUES ($1)
      ON CONFLICT (city) DO NOTHING
      `,
      [city]
    );

    res.status(201).json({
      message: 'Ciudad guardada en favoritos'
    });
  } catch (error) {
    console.error('Error /favorite:', error);
    res.status(500).json({
      message: 'Error guardando favorito'
    });
  }
});

//Eliminar una ciudad de favoritas
router.delete('/favorite/:city', async (req, res) => {
  const { city } = req.params;

  if (!city) {
    return res.status(400).json({ message: 'Ciudad requerida' });
  }

  try {
    const result = await pool.query(
      `
      DELETE FROM favorites
      WHERE city = $1
      `,
      [city]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'La ciudad no está en favoritos'
      });
    }

    res.json({
      message: 'Ciudad eliminada de favoritos'
    });
  } catch (error) {
    console.error('Error DELETE /favorite:', error);
    res.status(500).json({
      message: 'Error eliminando favorito'
    });
  }
});

export default router;
