import amqp from 'amqplib';
import dotenv from 'dotenv';
import { saveWeather } from './weather.service.js';
import { saveForecast } from './forecast.service.js';

dotenv.config();

export async function startRabbitConsumer() {
  while (true) {
    try {
      const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
      const connection = await amqp.connect(rabbitUrl);
      const channel = await connection.createChannel();

      await channel.assertQueue(process.env.RABBITMQ_QUEUE, { durable: true });

      console.log('Escuchando cola RabbitMQ...');
      
      channel.consume(process.env.RABBITMQ_QUEUE, async (msg) => {
        if (!msg) return;

        try {
          const data = JSON.parse(msg.content.toString());

          if (data.type === 'forecast') {
            await saveForecast(data);
          } else {
            await saveWeather(data);
          }

          channel.ack(msg);
        } catch (err) {
          console.error('Error procesando mensaje:', err.message);
        }
      });

      break; // ✔️ sale del loop si conecta bien
    } catch (error) {
      console.log('RabbitMQ no disponible, reintentando en 5s...');
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}

