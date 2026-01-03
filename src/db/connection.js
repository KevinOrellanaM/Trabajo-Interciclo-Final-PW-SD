import pkg from 'pg';
const { Pool } = pkg; //importa el manejador de PostgreSQL
import dotenv from 'dotenv';

dotenv.config(); // para manejar el .env

// creación de un conjunto de conexiones reutilizables
// -> soportar múltiples conexiones simultáneas
// -> evitar abrir/cerrar conexiones constantemente
export const pool = new Pool({  // exporta para que otros archivos lo usen.
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
