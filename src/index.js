import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.routes.js';
import forecastRoutes from './routes/forecast.routes.js';
import trendRoutes from './routes/trend.routes.js'
import { startRabbitConsumer } from './services/rabbit.service.js';

dotenv.config(); // para manejar .env

const app = express(); // creación de la aplicación express (servidor)

app.use(cors()); // manejar desde donde se pueden realizar peticiones
app.use(express.json()); // pertmite recibir JSON en las peticiones

// todas las rutas del clima empiezan con /weather
app.use('/weather', weatherRoutes); 
app.use('/weather', forecastRoutes);
app.use('/weather', trendRoutes)

// inicia el servidor HTTP
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

startRabbitConsumer(); // arranca el consumidor RabbitMQ en paralelo al servidor
