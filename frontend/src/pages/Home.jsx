import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import { getForecast } from "../services/weatherServices";
import { getWeatherIcon } from "../utils/weatherIcons";

export default function Home() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  /**
   * Restaurar forecast desde localStorage al montar la vista
   */
  useEffect(() => {
    const cached = localStorage.getItem("forecast_cache");

    if (cached) {
      const { city, data } = JSON.parse(cached);
      setCity(city);
      setForecast(data);
      setSearched(true);
    }
  }, []);

  /**
   * Guardar forecast en localStorage cada vez que se actualiza
   */
  useEffect(() => {
    if (forecast.length > 0 && city) {
      localStorage.setItem(
        "forecast_cache",
        JSON.stringify({
          city,
          data: forecast,
          savedAt: Date.now()
        })
      );
    }
  }, [forecast, city]);

  const fetchForecast = async (cityParam) => {
    try {
      const ciudad = cityParam || city;

      if (!ciudad.trim()) {
        setError("Por favor ingrese una ciudad.");
        return;
      }

      setSearched(true);

      const data = await getForecast(ciudad);

      // Normalización: un solo registro por fecha
      const uniqueByDate = Object.values(
        data.reduce((acc, item) => {
          const dateKey = item.forecast_date.split("T")[0];
          if (!acc[dateKey]) acc[dateKey] = item;
          return acc;
        }, {})
      );

      setForecast(uniqueByDate);
      setCity(ciudad);
      setError("");
    } catch (err) {
      console.error(err);
      setError("No se pudo obtener la predicción del clima.");
      setForecast([]);
      setSearched(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <div
        className="hero"
        style={{ backgroundImage: "url('/images/banner.png')" }}
      >
        <div
          className="container"
          style={{ textAlign: "center", padding: "60px 20px" }}
        >
          <form
            className="find-location"
            onSubmit={(e) => {
              e.preventDefault();
              fetchForecast();
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              gap: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Buscar ciudad..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                padding: "12px 20px",
                borderRadius: "30px",
                border: "1px solid #ccc",
                outline: "none",
                width: "800px",
                fontSize: "16px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "12px 25px",
                borderRadius: "30px",
                border: "none",
                backgroundColor: "#009ad8",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Buscar
            </button>
          </form>

          {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
        </div>
      </div>

      {/* Forecast */}
      {searched && (
        <div className="fullwidth-block">
          <div className="container">
            <div className="forecast-container">
              {forecast.length > 0 ? (
                <>
                  {/* Día actual */}
                  <div className="today forecast">
                    <div className="forecast-header">
                      <div className="day">
                        {new Date(
                          forecast[0].forecast_date
                        ).toLocaleDateString("es-EC", {
                          weekday: "long",
                        })}
                      </div>
                      <div className="date">
                        {new Date(
                          forecast[0].forecast_date
                        ).toLocaleDateString("es-EC", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    </div>

                    <div className="forecast-content">
                      <div className="location">{city}</div>

                      <div className="degree">
                        <div className="num">
                          {Math.round(
                            (Number(forecast[0].min_temp) +
                              Number(forecast[0].max_temp)) /
                              2
                          )}
                          <sup>°</sup>C
                        </div>
                        <div className="forecast-icon">
                          <img
                            src={getWeatherIcon(forecast[0].weather)}
                            alt={forecast[0].weather}
                            width="90"
                          />
                        </div>
                      </div>

                      {forecast[0].humidity && (
                        <span>
                          <img src="/images/icon-umberella.png" alt="" />
                          {forecast[0].humidity}%
                        </span>
                      )}

                      <span>{forecast[0].weather}</span>
                    </div>
                  </div>

                  {/* Próximos días */}
                  {forecast.slice(1).map((item, idx) => (
                    <div className="forecast" key={idx}>
                      <div className="forecast-header">
                        <div className="day">
                          {new Date(
                            item.forecast_date
                          ).toLocaleDateString("es-EC", {
                            weekday: "short",
                          })}
                        </div>
                        <div className="date">
                          {new Date(
                            item.forecast_date
                          ).toLocaleDateString("es-EC", {
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                      </div>

                      <div className="forecast-content">
                        <div className="forecast-icon">
                          <img
                            src={getWeatherIcon(item.weather)}
                            alt={item.weather}
                            width="48"
                          />
                        </div>

                        <div className="degree">
                          {Math.round(
                            (Number(item.min_temp) +
                              Number(item.max_temp)) /
                              2
                          )}
                          <sup>°</sup>C
                        </div>

                        {item.humidity && (
                          <small>{item.humidity}%</small>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p>No hay datos disponibles.</p>
              )}
            </div>
          </div>

          {/* Mapa */}
          {forecast.length > 0 && (
            <div className="container" style={{ marginTop: "40px" }}>
              <Map mode="city" city={city} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
