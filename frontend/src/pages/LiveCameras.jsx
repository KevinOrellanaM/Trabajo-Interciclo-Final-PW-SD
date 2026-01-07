import React, { useEffect, useState } from "react";
import { getHistory } from "../services/weatherServices";

export default function Historial() {
  const [history, setHistory] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const ultimaCiudad = localStorage.getItem("ultimaCiudad");

    if (!ultimaCiudad) {
      setError("No se ha seleccionado ninguna ciudad.");
      return;
    }

    setCity(ultimaCiudad);

    getHistory(ultimaCiudad)
      .then((data) => setHistory(data))
      .catch(() =>
        setError("No se pudo obtener el historial climático.")
      );
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

          {history.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Temperatura (°C)</th>
                    <th>Humedad (%)</th>
                    <th>Viento (km/h)</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.fecha}</td>
                      <td>{item.temperatura}</td>
                      <td>{item.humedad}</td>
                      <td>{item.viento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !error && <p>Cargando historial...</p>
          )}
        </div>
      </div>
    </main>
  );
}
