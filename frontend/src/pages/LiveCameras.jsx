import React, { useEffect, useState } from "react";
import { getHistory } from "../services/weatherServices";

export default function Historial() {
  const [history, setHistory] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ultimaCiudad = localStorage.getItem("ultimaCiudad");

    if (!ultimaCiudad) {
      setError("No se ha seleccionado ninguna ciudad.");
      setLoading(false);
      return;
    }

    setCity(ultimaCiudad);

    getHistory(ultimaCiudad)
      .then((data) => {
        // 🔹 Adaptar datos del backend
        const formattedHistory = data.map(item => ({
          fecha: new Date(item.timestamp).toLocaleString(),
          temperatura: Number(item.temperature).toFixed(1),
          humedad: item.humidity,
          fuente: item.source
        }));

        setHistory(formattedHistory);
      })
      .catch(() =>
        setError("No se pudo obtener el historial climático.")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="main-content">
      {/* Breadcrumb */}
      <div className="container">
        <div className="breadcrumb">
          <a href="/">Inicio</a>
          <span>Historial</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="fullwidth-block">
        <div className="container">
          <h2 className="section-title">
            Historial climático — {city}
          </h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {loading && <p>Cargando historial...</p>}

          {!loading && history.length > 0 && (
            <div className="table weather-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Temperatura (°C)</th>
                    <th>Humedad (%)</th>
                    <th>Fuente</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.fecha}</td>
                      <td>{item.temperatura}</td>
                      <td>{item.humedad}</td>
                      <td>{item.fuente}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && history.length === 0 && !error && (
            <p>No hay registros históricos disponibles.</p>
          )}
        </div>
      </div>
    </main>
  );
}
