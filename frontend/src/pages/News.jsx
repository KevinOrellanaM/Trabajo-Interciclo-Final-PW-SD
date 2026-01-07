import React, { useEffect, useState } from "react";
import { getTrend } from "../services/weatherServices";

export default function News() {
  const [trend, setTrend] = useState(null);
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

    getTrend(ultimaCiudad)
      .then((data) => setTrend(data))
      .catch(() =>
        setError("No se pudo obtener la tendencia de temperatura.")
      )
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

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
            Tendencia de temperatura — {city || "..."}
          </h2>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading && !error && <p>Cargando tendencias...</p>}

          {!loading && trend && (
            <div className="forecast-container"
            style={{ marginTop: "40px" }}>
              <div className="forecast today">
                <div className="forecast-header">
                  <div className="day">Ciudad</div>
                  <div className="date">{city}</div>
                </div>
                <div className="forecast-content">
                  <div className="degree">
                    <span className="num">
                      {trend.data?.[0]?.avg_temp
                        ? parseFloat(trend.data[0].avg_temp).toFixed(1)
                        : "-"}°C
                    </span>
                  </div>
                  <small>
                    {trend.days_analyzed
                      ? `${trend.days_analyzed} día(s) analizado(s)`
                      : "-"}
                  </small>
                  <p style={{ marginTop: "15px", color: "#009ad8" }}>
                    {trend.message || "-"}
                  </p>
                  <p
                    style={{
                      marginTop: "10px",
                      fontWeight: "bold",
                      color:
                        trend.trend === "sube"
                          ? "green"
                          : trend.trend === "baja"
                          ? "red"
                          : "gray",
                    }}
                  >
                    Tendencia: {trend.trend.toUpperCase() || "-"}
                  </p>
                  {trend.data && trend.data.length > 0 && (
                    <p>Fecha: {formatDate(trend.data[0].day)}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
