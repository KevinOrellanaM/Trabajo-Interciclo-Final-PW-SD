import React, { useEffect, useState } from "react";
import { getTrend } from "../services/weatherServices";

export default function News() {
  const [trend, setTrend] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const ultimaCiudad = localStorage.getItem("ultimaCiudad");

    if (!ultimaCiudad) {
      setError("No se ha seleccionado ninguna ciudad.");
      return;
    }

    setCity(ultimaCiudad);

    getTrend(ultimaCiudad)
      .then((data) => setTrend(data))
      .catch(() =>
        setError("No se pudo obtener la tendencia de temperatura.")
      );
  }, []);

  return (
    <main className="main-content">
      <div className="container">
        <div className="breadcrumb">
          <a href="/">Inicio</a>
          <span>Tendencias</span>
        </div>
      </div>

      <div className="fullwidth-block">
        <div className="container">
          <h2 className="section-title">
            Tendencia de temperatura — {city}
          </h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {trend && (
            <div className="row">
              <div className="col-md-4">
                <div className="widget">
                  <h3>Promedio</h3>
                  <p>{trend.temperatura_promedio} °C</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="widget">
                  <h3>Tendencia</h3>
                  <p
                    style={{
                      color:
                        trend.tendencia === "sube"
                          ? "green"
                          : trend.tendencia === "baja"
                          ? "red"
                          : "gray",
                    }}
                  >
                    {trend.tendencia.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="widget">
                  <h3>Días analizados</h3>
                  <p>{trend.dias}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
