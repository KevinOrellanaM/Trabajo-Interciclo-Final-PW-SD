import { pool } from '../db/connection.js';

export async function getTemperatureTrend(city, days = 7) {
  const { rows } = await pool.query(
    `
    SELECT
      DATE(timestamp) AS day,
      AVG(temperature) AS avg_temp
    FROM weather_data
    WHERE city = $1
      AND timestamp >= NOW() - INTERVAL '${days} days'
    GROUP BY day
    ORDER BY day
    `,
    [city]
  );

  if (rows.length < 2) {
    return {
      trend: 'insufficient_data',
      data: rows
    };
  }

  const first = Number(rows[0].avg_temp);
  const last = Number(rows[rows.length - 1].avg_temp);

  let trend = 'stable';
  if (last > first) trend = 'up';
  if (last < first) trend = 'down';

  return {
    trend,
    difference: (last - first).toFixed(2),
    data: rows
  };
}
