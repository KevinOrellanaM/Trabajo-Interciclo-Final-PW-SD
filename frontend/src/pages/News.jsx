import React, { useEffect, useState } from "react";
import { getTrend } from "../services/weatherServices";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  FiTrendingUp,
  FiTrendingDown,
  FiBarChart2,
} from "react-icons/fi";
import { WiThermometer } from "react-icons/wi";

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

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
    });

  const renderTrendIcon = () => {
    if (trend.trend === "sube")
      return <FiTrendingUp size={24} color="green" />;
    if (trend.trend === "baja")
      return <FiTrendingDown size={24} color="red" />;
    return <FiBarChart2 size={24} color="gray" />;
  };

  return (
    <main className="main-content">
      <div className="fullwidth-block">
        <div className="container">
          <h2 className="section-title">
            <FiBarChart2 style={{ marginRight: "8px" }} />
            Dashboard climático — {city}
          </h2>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading && !error && <p>Cargando información...</p>}

          {!loading && trend && (
            <>
              {/* ===== KPIs ===== */}
              <div className="row" style={{ marginTop: "30px" }}>
                <div className="col-md-4">
                  <div className="forecast">
                    <div className="forecast-header">
                      <div className="day">
                        <WiThermometer /> Temperatura promedio
                      </div>
                    </div>
                    <div className="forecast-content">
                      <div className="degree">
                        <span className="num">
                          {trend.data?.[0]?.avg_temp
                            ? parseFloat(
                                trend.data[0].avg_temp
                              ).toFixed(1)
                            : "-"}
                          °C
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="forecast">
                    <div className="forecast-header">
                      <div className="day">Días analizados</div>
                    </div>
                    <div className="forecast-content">
                      <div className="degree">
                        <span className="num">
                          {trend.days_analyzed}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="forecast">
                    <div className="forecast-header">
                      <div className="day">Tendencia</div>
                    </div>
                    <div className="forecast-content">
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontWeight: "bold",
                        }}
                      >
                        {renderTrendIcon()}
                        {trend.trend.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== GRÁFICO ===== */}
              <div className="forecast-container" style={{ marginTop: "40px" }}>
                <div className="forecast today">
                  <div className="forecast-header">
                    <div className="day">Evolución de temperatura</div>
                  </div>

                  <div
                    className="forecast-content"
                    style={{ height: "300px" }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trend.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="day"
                          tickFormatter={formatDate}
                        />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="avg_temp"
                          stroke="#009ad8"
                          strokeWidth={2}
                          dot={{ r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
