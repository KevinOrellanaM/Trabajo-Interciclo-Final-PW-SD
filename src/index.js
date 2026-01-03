import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.routes.js';
import { startRabbitConsumer } from './services/rabbit.service.js';

dotenv.config(); // para manejar .env

const app = express(); // creación de la aplicación express (servidor)

app.use(cors()); // manejar desde donde se pueden realizar peticiones
app.use(express.json()); // pertmite recibir JSON en las peticiones

app.use('/weather', weatherRoutes); // todas las rutas del clima empiezan con /weather

// inicia el servidor HTTP
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

startRabbitConsumer(); // arranca el consumidor RabbitMQ en paralelo al servidor
