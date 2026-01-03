import pkg from 'pg';
const { Pool } = pkg; // Para manejar PostgreSQL 

// creación de un conjunto de conexiones reutilizables
// -> soportar múltiples conexiones simultáneas
// -> evitar abrir/cerrar conexiones constantemente
export const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'weather_user',
  password: process.env.DB_PASSWORD || 'weather_pass',
  database: process.env.DB_NAME || 'weather_db',
  port: Number(process.env.DB_PORT) || 5432,
});

