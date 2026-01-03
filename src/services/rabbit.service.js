import amqp from 'amqplib';
import dotenv from 'dotenv';
import { saveWeather } from './weather.service.js';
import { saveForecast } from './forecast.service.js';

dotenv.config();

const RABBIT_URL =
  process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';

const QUEUE = process.env.RABBITMQ_QUEUE || 'weather_queue';

export async function startRabbitConsumer() {
  while (true) {
    try {
      console.log('Conectando a RabbitMQ...');

      const connection = await amqp.connect(RABBIT_URL);
      const channel = await connection.createChannel();

      await channel.assertQueue(QUEUE, { durable: true });

      console.log(`Escuchando cola RabbitMQ: ${QUEUE}`);

      channel.consume(
        QUEUE,
        async (msg) => {
          if (!msg) return;

          let data;

          try {
            data = JSON.parse(msg.content.toString());

            // 🔑 Enrutamiento explícito por tipo
            if (data.type === 'current') {
              await saveWeather(data);
            } else if (data.type === 'forecast') {
              await saveForecast(data);
            } else {
              console.warn(
                'Tipo de mensaje desconocido, descartando:',
                data.type
              );
            }

            channel.ack(msg);
          } catch (err) {
            console.error('Error procesando mensaje:', err.message);

            // ❌ mensaje inválido → no reintentar
            channel.nack(msg, false, false);
          }
        },
        {
          noAck: false
        }
      );

      // ✔️ sale del loop si conecta correctamente
      break;
    } catch (error) {
      console.log('RabbitMQ no disponible, reintentando en 5s...');
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}
