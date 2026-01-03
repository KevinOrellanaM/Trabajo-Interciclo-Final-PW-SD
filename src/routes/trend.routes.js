import express from 'express';
import { getTemperatureTrend } from '../services/trend.service.js';

const router = express.Router();

router.get('/trend/temperature', async (req, res) => {
  const { city, days } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'Ciudad requerida' });
  }

  try {
    const trend = await getTemperatureTrend(city, days || 7);
    res.json(trend);
  } catch (error) {
    res.status(500).json({ message: 'Error calculando tendencia' });
  }
});

export default router;
