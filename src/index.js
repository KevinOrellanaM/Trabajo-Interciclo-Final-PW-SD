import dotenv from 'dotenv';
dotenv.config(); // SIEMPRE PRIMERO - Para manejar .env

import express from 'express';
import cors from 'cors';

import weatherRoutes from './routes/weather.routes.js';
import forecastRoutes from './routes/forecast.routes.js';
import trendRoutes from './routes/trend.routes.js';

import { startRabbitConsumer } from './services/rabbit.service.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/weather', weatherRoutes);
app.use('/weather', forecastRoutes);
app.use('/weather', trendRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// ⚠️ NO bloquear, debe correr en paralelo
startRabbitConsumer();
