import amqp from 'amqplib';
import dotenv from 'dotenv';
import { saveWeather } from './weather.service.js';
import { saveForecast } from './forecast.service.js';

dotenv.config();

export async function startRabbitConsumer() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(process.env.RABBITMQ_QUEUE, {
    durable: true
  });

  console.log('Escuchando cola RabbitMQ...');

  channel.consume(process.env.RABBITMQ_QUEUE, async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());

      // Enrutamiento por tipo de mensaje
      if (data.type === 'forecast') {
        await saveForecast(data);
      } else {
        await saveWeather(data);
      }

      channel.ack(msg); // ✔️ Mensaje procesado correctamente
    } catch (error) {
      console.error('Error procesando mensaje:', error.message);

      // No hacemos ack → RabbitMQ lo reintenta
    }
  });
}
